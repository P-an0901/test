import sqlite3
from http.server import BaseHTTPRequestHandler, HTTPServer
import urllib.parse
import os

# Kết nối tới cơ sở dữ liệu SQLite
def get_db_connection():
    conn = sqlite3.connect('mydatabase.db')
    conn.row_factory = sqlite3.Row
    return conn

# Lớp xử lý HTTP requests
class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):
    
    def _set_headers(self, content_type="text/html"):
        self.send_response(200)
        self.send_header('Content-type', content_type)
        self.end_headers()

    def do_GET(self):
        if self.path == '/':
            self.show_index()
        elif self.path == '/create':
            self.show_create_form()
        elif self.path.startswith('/edit/'):
            user_id = int(self.path.split('/')[-1])
            self.show_edit_form(user_id)
        elif self.path.startswith('/delete/'):
            user_id = int(self.path.split('/')[-1])
            self.delete_user(user_id)
        elif self.path.startswith('/static/'):
            self.serve_static_file(self.path)
        else:
            self.send_error(404, "File Not Found")

    def do_POST(self):
        if self.path == '/create':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length).decode('utf-8')
            params = urllib.parse.parse_qs(post_data)
            
            name = params['name'][0]
            age = params['age'][0]
            
            conn = get_db_connection()
            conn.execute('INSERT INTO users (name, age) VALUES (?, ?)', (name, age))
            conn.commit()
            conn.close()
            
            self.send_response(302)
            self.send_header('Location', '/')
            self.end_headers()
        
        elif self.path.startswith('/update/'):
            user_id = int(self.path.split('/')[-1])
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length).decode('utf-8')
            params = urllib.parse.parse_qs(post_data)

            name = params['name'][0]
            age = params['age'][0]

            conn = get_db_connection()
            conn.execute('UPDATE users SET name = ?, age = ? WHERE id = ?', (name, age, user_id))
            conn.commit()
            conn.close()

            self.send_response(302)
            self.send_header('Location', '/')
            self.end_headers()

    # Hiển thị trang danh sách người dùng
    def show_index(self):
        conn = get_db_connection()
        users = conn.execute('SELECT * FROM users').fetchall()
        conn.close()

        with open('templates/index.html', 'r') as f:
            html = f.read()
        
        # Thêm người dùng vào HTML
        user_rows = ''
        for user in users:
            user_rows += f'''
                <tr>
                    <td>{user["id"]}</td>
                    <td>{user["name"]}</td>
                    <td>{user["age"]}</td>
                    <td>
                        <a href="/edit/{user["id"]}">Edit</a> | 
                        <a href="/delete/{user["id"]}">Delete</a>
                    </td>
                </tr>
            '''
        html = html.replace('{{ user_rows }}', user_rows)

        self._set_headers()
        self.wfile.write(html.encode('utf-8'))

    # Hiển thị form tạo người dùng
    def show_create_form(self):
        with open('templates/create.html', 'r') as f:
            html = f.read()
        
        self._set_headers()
        self.wfile.write(html.encode('utf-8'))

    # Hiển thị form chỉnh sửa người dùng
    def show_edit_form(self, user_id):
        conn = get_db_connection()
        user = conn.execute('SELECT * FROM users WHERE id = ?', (user_id,)).fetchone()
        conn.close()

        with open('templates/edit.html', 'r') as f:
            html = f.read()

        # Thay thế thông tin người dùng vào HTML
        html = html.replace('{{ user_id }}', str(user['id']))
        html = html.replace('{{ user_name }}', user['name'])
        html = html.replace('{{ user_age }}', str(user['age']))

        self._set_headers()
        self.wfile.write(html.encode('utf-8'))

    # Xóa người dùng
    def delete_user(self, user_id):
        conn = get_db_connection()
        conn.execute('DELETE FROM users WHERE id = ?', (user_id,))
        conn.commit()
        conn.close()
        
        self.send_response(302)
        self.send_header('Location', '/')
        self.end_headers()

    # Phục vụ file tĩnh (CSS, hình ảnh, ...)
    def serve_static_file(self, path):
        file_path = os.getcwd() + path
        if os.path.exists(file_path):
            if path.endswith('.css'):
                self._set_headers("text/css")
            else:
                self._set_headers()
            with open(file_path, 'rb') as f:
                self.wfile.write(f.read())
        else:
            self.send_error(404, "File Not Found")


# Hàm để chạy server
def run(server_class=HTTPServer, handler_class=SimpleHTTPRequestHandler, port=8080):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print(f"Server running on port {port}...")
    httpd.serve_forever()

if __name__ == '__main__':
    
    run()
