from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from .models import Class,Student
from .serializers import ClassSerializer,StudentSerializer
from rest_framework.permissions import AllowAny
from django.shortcuts import render

# Danh sách và tạo lớp học
class ClassListCreateAPIView(generics.ListCreateAPIView):
    queryset = Class.objects.all()
    serializer_class = ClassSerializer
  #  permission_classes = [AllowAny] 
    # Custom GET method (có thể không cần thiết nếu dùng mặc định)
    def get(self, request, *args, **kwargs):
        try:
            return self.list(request, *args, **kwargs)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    # Custom POST method để tạo lớp học mới
    def post(self, request, *args, **kwargs):
        try:
            return self.create(request, *args, **kwargs)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    # Xử lý khi tạo lớp học
    def perform_create(self, serializer):
        instance = serializer.save()  # Lưu instance vào database
        print(f"Created class: {instance}")  # In ra log hoặc làm gì đó sau khi tạo
        return instance

# Chi tiết, cập nhật và xóa lớp học
class ClassRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Class.objects.all()
    serializer_class = ClassSerializer
 #   permission_classes = [AllowAny] 


    # Custom GET method để lấy chi tiết lớp học
    def get(self, request, *args, **kwargs):
        try:
            return self.retrieve(request, *args, **kwargs)
        except Class.DoesNotExist:
            return Response({"error": "Class not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    # Custom PUT method để cập nhật lớp học
    def put(self, request, *args, **kwargs):
        try:
            return self.update(request, *args, **kwargs)
        except Class.DoesNotExist:
            return Response({"error": "Class not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    # Custom DELETE method để xóa lớp học
    def delete(self, request, *args, **kwargs):
        try:
            return self.destroy(request, *args, **kwargs)
        except Class.DoesNotExist:
            return Response({"error": "Class not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)





class StudentListCreateAPIView(generics.ListCreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
  #  permission_classes = [AllowAny] 
    # Custom GET method (có thể không cần thiết nếu dùng mặc định)
    def get(self, request, *args, **kwargs):
        try:
            return self.list(request, *args, **kwargs)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    # Custom POST method để tạo lớp học mới
    def post(self, request, *args, **kwargs):
        try:
            return self.create(request, *args, **kwargs)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    # Xử lý khi tạo lớp học
    def perform_create(self, serializer):
        instance = serializer.save()  # Lưu instance vào database
        print(f"Created student: {instance}")  # In ra log hoặc làm gì đó sau khi tạo
        return instance

# Chi tiết, cập nhật và xóa lớp học
class StudentRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
 #   permission_classes = [AllowAny] 


    # Custom GET method để lấy chi tiết lớp học
    def get(self, request, *args, **kwargs):
        try:
            return self.retrieve(request, *args, **kwargs)
        except Student.DoesNotExist:
            return Response({"error": "Student not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    # Custom PUT method để cập nhật lớp học
    def put(self, request, *args, **kwargs):
        try:
            return self.update(request, *args, **kwargs)
        except Student.DoesNotExist:
            return Response({"error": "Student not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    # Custom DELETE method để xóa lớp học
    def delete(self, request, *args, **kwargs):
        try:
            return self.destroy(request, *args, **kwargs)
        except Student.DoesNotExist:
            return Response({"error": "Student not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)