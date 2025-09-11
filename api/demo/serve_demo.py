#!/usr/bin/env python3
"""
Simple HTTP server for the Open API Kundenbeziehung Demo
This ensures proper MIME types and CORS headers for local development.
"""

import http.server
import socketserver
import os
import sys
import socket

class DemoHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add CORS headers
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()
    
    def guess_type(self, path):
        # Ensure proper MIME types
        result = super().guess_type(path)
        if isinstance(result, tuple) and len(result) == 2:
            mimetype, encoding = result
        else:
            mimetype, encoding = result, None
        
        # Override for common file types
        if path.endswith('.png'):
            return 'image/png', encoding
        elif path.endswith(('.jpg', '.jpeg')):
            return 'image/jpeg', encoding
        elif path.endswith('.svg'):
            return 'image/svg+xml', encoding
        elif path.endswith('.css'):
            return 'text/css', encoding
        elif path.endswith('.js'):
            return 'application/javascript', encoding
        elif path.endswith('.html'):
            return 'text/html', encoding
            
        return mimetype, encoding
    
    def do_GET(self):
        # Redirect root to demo
        if self.path == '/':
            self.send_response(302)
            self.send_header('Location', '/index.html')
            self.end_headers()
            return
            
        return super().do_GET()

def find_available_port(start_port=8000, max_attempts=10):
    """Find an available port starting from start_port"""
    for port in range(start_port, start_port + max_attempts):
        try:
            with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
                s.bind(('localhost', port))
                return port
        except OSError:
            continue
    return None

def main():
    requested_port = 8000
    if len(sys.argv) > 1:
        try:
            requested_port = int(sys.argv[1])
        except ValueError:
            print(f"❌ Invalid port number: {sys.argv[1]}")
            sys.exit(1)
    
    # Find an available port
    port = find_available_port(requested_port)
    if port is None:
        print(f"❌ Could not find an available port starting from {requested_port}")
        print("💡 Try a different port: python3 serve_demo.py 8080")
        sys.exit(1)
    
    if port != requested_port:
        print(f"⚠️  Port {requested_port} is busy, using port {port} instead")
    
    # Change to the directory containing this script
    try:
        os.chdir(os.path.dirname(os.path.abspath(__file__)))
    except OSError as e:
        print(f"❌ Could not change directory: {e}")
        sys.exit(1)
    
    # Create server with proper error handling
    try:
        # Enable address reuse to avoid "Address already in use" errors
        socketserver.TCPServer.allow_reuse_address = True
        
        with socketserver.TCPServer(("", port), DemoHTTPRequestHandler) as httpd:
            print("=" * 60)
            print("🏦 Open API Kundenbeziehung Demo Server")
            print("=" * 60)
            print(f"📡 Server running on: http://localhost:{port}")
            print(f"📂 Serving directory: {os.getcwd()}")
            print("🌐 Demo URL: http://localhost:{}/index.html".format(port))
            print("🧪 Image Test: http://localhost:{}/image-test.html".format(port))
            print()
            print("📋 Available endpoints:")
            print(f"   • Main Demo:     http://localhost:{port}/context-demo.html")
            print(f"   • Image Test:    http://localhost:{port}/image-test.html")
            print(f"   • Auto Redirect: http://localhost:{port}/")
            print()
            print("💡 Tips:")
            print("   • Use Ctrl+C to stop the server")
            print("   • If images don't load, check the image test page first")
            print("   • For production, use a proper web server like nginx or Apache")
            print("=" * 60)
            print()
        
            try:
                httpd.serve_forever()
            except KeyboardInterrupt:
                print("\n🛑 Server stopped by user")
                print("Thank you for using the Open API Kundenbeziehung Demo!")
            except Exception as e:
                print(f"\n❌ Server error: {e}")
                print("💡 Try restarting or use a different port")
    
    except OSError as e:
        if "Address already in use" in str(e):
            print(f"❌ Port {port} is already in use")
            print(f"💡 Try: python3 serve_demo.py {port + 1}")
            print(f"💡 Or kill existing process: lsof -ti:{port} | xargs kill")
        else:
            print(f"❌ Server startup failed: {e}")
        sys.exit(1)
    
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
        print("💡 Try using standard server: python3 -m http.server 8000")
        sys.exit(1)

if __name__ == "__main__":
    main()