#!/usr/bin/env python3
"""
Backend API Testing Script for Image Detail Tabs Functionality
Tests all API endpoints for versions, vulnerabilities, SBOM, provenance, specifications, and advisories
"""

import requests
import json
import sys
from typing import Dict, List, Any
from datetime import datetime

# Configuration
BASE_URL = "http://localhost:8001/api/v1"
TEST_IMAGES = ["node", "nginx", "postgres"]

class APITester:
    def __init__(self, base_url: str):
        self.base_url = base_url
        self.session = requests.Session()
        self.results = {
            "total_tests": 0,
            "passed": 0,
            "failed": 0,
            "errors": []
        }
    
    def log_result(self, test_name: str, success: bool, message: str = ""):
        """Log test result"""
        self.results["total_tests"] += 1
        if success:
            self.results["passed"] += 1
            print(f"✅ {test_name}")
        else:
            self.results["failed"] += 1
            self.results["errors"].append(f"{test_name}: {message}")
            print(f"❌ {test_name}: {message}")
    
    def test_endpoint(self, endpoint: str, expected_fields: List[str], test_name: str) -> bool:
        """Test a single endpoint"""
        try:
            url = f"{self.base_url}{endpoint}"
            print(f"\n🔍 Testing: {url}")
            
            response = self.session.get(url, timeout=10)
            
            if response.status_code != 200:
                self.log_result(test_name, False, f"HTTP {response.status_code}: {response.text}")
                return False
            
            try:
                data = response.json()
            except json.JSONDecodeError as e:
                self.log_result(test_name, False, f"Invalid JSON response: {e}")
                return False
            
            # Check if response is a list or dict
            if isinstance(data, list):
                if not data:
                    self.log_result(test_name, False, "Empty array response")
                    return False
                # Check first item in array
                item = data[0]
            else:
                item = data
            
            # Validate expected fields
            missing_fields = []
            for field in expected_fields:
                if field not in item:
                    missing_fields.append(field)
            
            if missing_fields:
                self.log_result(test_name, False, f"Missing fields: {missing_fields}")
                return False
            
            self.log_result(test_name, True, f"Response contains {len(data) if isinstance(data, list) else 1} item(s)")
            return True
            
        except requests.exceptions.RequestException as e:
            self.log_result(test_name, False, f"Request failed: {e}")
            return False
        except Exception as e:
            self.log_result(test_name, False, f"Unexpected error: {e}")
            return False
    
    def test_versions_endpoint(self, image_name: str) -> bool:
        """Test versions endpoint"""
        endpoint = f"/images/{image_name}/versions"
        expected_fields = ["tag", "pull_url", "compressed_size", "architectures", "last_changed", "is_free", "variant"]
        return self.test_endpoint(endpoint, expected_fields, f"Versions endpoint for {image_name}")
    
    def test_vulnerabilities_endpoint(self, image_name: str) -> bool:
        """Test vulnerabilities endpoint"""
        endpoint = f"/images/{image_name}/vulnerabilities"
        expected_fields = ["cve_id", "severity", "package", "installed_version", "fixed_version", "cvss_score", "description"]
        return self.test_endpoint(endpoint, expected_fields, f"Vulnerabilities endpoint for {image_name}")
    
    def test_sbom_endpoint(self, image_name: str) -> bool:
        """Test SBOM endpoint"""
        endpoint = f"/images/{image_name}/sbom"
        expected_fields = ["name", "version", "license", "package_type", "source"]
        return self.test_endpoint(endpoint, expected_fields, f"SBOM endpoint for {image_name}")
    
    def test_provenance_endpoint(self, image_name: str) -> bool:
        """Test provenance endpoint"""
        endpoint = f"/images/{image_name}/provenance"
        expected_fields = ["built_at", "builder", "source_repo", "commit_sha", "build_platform"]
        return self.test_endpoint(endpoint, expected_fields, f"Provenance endpoint for {image_name}")
    
    def test_specifications_endpoint(self, image_name: str) -> bool:
        """Test specifications endpoint"""
        endpoint = f"/images/{image_name}/specifications"
        expected_fields = ["base_image", "layers", "total_size", "created", "author", "entrypoint", "cmd", "env_vars", "exposed_ports", "volumes"]
        return self.test_endpoint(endpoint, expected_fields, f"Specifications endpoint for {image_name}")
    
    def test_advisories_endpoint(self, image_name: str) -> bool:
        """Test advisories endpoint"""
        endpoint = f"/images/{image_name}/advisories"
        expected_fields = ["advisory_id", "title", "severity", "published_date", "affected_versions", "description", "mitigation"]
        return self.test_endpoint(endpoint, expected_fields, f"Advisories endpoint for {image_name}")
    
    def test_all_endpoints_for_image(self, image_name: str):
        """Test all endpoints for a specific image"""
        print(f"\n🐳 Testing all endpoints for image: {image_name}")
        print("=" * 60)
        
        # Test all endpoints
        self.test_versions_endpoint(image_name)
        self.test_vulnerabilities_endpoint(image_name)
        self.test_sbom_endpoint(image_name)
        self.test_provenance_endpoint(image_name)
        self.test_specifications_endpoint(image_name)
        self.test_advisories_endpoint(image_name)
    
    def test_health_endpoint(self):
        """Test health endpoint"""
        try:
            url = f"{self.base_url.replace('/v1', '')}/health"
            print(f"\n🔍 Testing health endpoint: {url}")
            
            response = self.session.get(url, timeout=5)
            if response.status_code == 200:
                self.log_result("Health endpoint", True)
                return True
            else:
                self.log_result("Health endpoint", False, f"HTTP {response.status_code}")
                return False
        except Exception as e:
            self.log_result("Health endpoint", False, f"Request failed: {e}")
            return False
    
    def run_all_tests(self):
        """Run all tests"""
        print("🚀 Starting Backend API Tests for Image Detail Tabs")
        print("=" * 60)
        
        # Test health endpoint first
        self.test_health_endpoint()
        
        # Test all endpoints for each image
        for image_name in TEST_IMAGES:
            self.test_all_endpoints_for_image(image_name)
        
        # Print summary
        self.print_summary()
    
    def print_summary(self):
        """Print test summary"""
        print("\n" + "=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        print(f"Total Tests: {self.results['total_tests']}")
        print(f"Passed: {self.results['passed']} ✅")
        print(f"Failed: {self.results['failed']} ❌")
        
        if self.results['errors']:
            print("\n🚨 FAILED TESTS:")
            for error in self.results['errors']:
                print(f"  - {error}")
        
        success_rate = (self.results['passed'] / self.results['total_tests']) * 100 if self.results['total_tests'] > 0 else 0
        print(f"\nSuccess Rate: {success_rate:.1f}%")
        
        if self.results['failed'] == 0:
            print("\n🎉 All tests passed!")
            return True
        else:
            print(f"\n⚠️  {self.results['failed']} test(s) failed")
            return False

def main():
    """Main function"""
    print("Backend API Testing Script")
    print(f"Testing against: {BASE_URL}")
    print(f"Test images: {', '.join(TEST_IMAGES)}")
    
    tester = APITester(BASE_URL)
    success = tester.run_all_tests()
    
    # Exit with appropriate code
    sys.exit(0 if success else 1)

if __name__ == "__main__":
    main()