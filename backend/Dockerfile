# Use an official lightweight Python image
FROM python:3.10-slim

# Set the working directory
WORKDIR /app

# Copy dependency files first (to leverage Docker caching)
COPY requirements.txt ./

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application
COPY . .

# Expose a port (modify depending on your framework)
EXPOSE 5000

# Command to run the backend (Modify for Flask/Django)
CMD ["python", "app.py"]
