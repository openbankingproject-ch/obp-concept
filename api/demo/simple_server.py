#!/usr/bin/env python3
"""
Simple fallback HTTP server for the Open API Kundenbeziehung Demo
Minimal implementation with just MIME type fixes for image display.
"""

import http.server
import socketserver
import os

class SimpleHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    """Simple handler with proper MIME types for images"""
    
    def guess_type(self, path):
        """Fix MIME types for images"""
        if path.endswith('.png'):
            return 'image/png', None
        elif path.endswith(('.jpg', '.jpeg')):
            return 'image/jpeg', None
        elif path.endswith('.svg'):
            return 'image/svg+xml', None
        return super().guess_type(path)
    
    def do_GET(self):
        """Handle GET requests with root redirect"""
        if self.path == '/':
            self.send_response(302)
            self.send_header('Location', '/index.html')
            self.end_headers()
            return
        return super().do_GET()

if __name__ == "__main__":
    PORT = 8001  # Use different port to avoid conflicts
    
    # Change to script directory
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    print("🏦 Open API Kundenbeziehung Demo - Simple Server")
    print("=" * 50)
    
    try:
        with socketserver.TCPServer(("", PORT), SimpleHTTPRequestHandler) as httpd:
            print(f"✅ Server running on: http://localhost:{PORT}")
            print(f"🌐 Demo URL: http://localhost:{PORT}/")
            print("Press Ctrl+C to stop")
            print("=" * 50)
            httpd.serve_forever()
    except OSError as e:
        if "Address already in use" in str(e):
            print(f"❌ Port {PORT} is busy.")
            print("💡 Try: python3 -m http.server 8002")
        else:
            print(f"❌ Error: {e}")
    except KeyboardInterrupt:
        print("\n✋ Server stopped")