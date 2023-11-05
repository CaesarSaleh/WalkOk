import json
from random import uniform
from geopy.distance import geodesic

# Define the coordinates of Toronto
toronto_coordinates = (43.90, -79.42)  # (latitude, longitude)

# Define the number of features you want for Toronto
num_toronto_features = 200

# Define the radius (in kilometers) around Toronto (approximately 20 miles)
toronto_radius = 32.18688

# Create an array to store the features
features = []

# Generate random coordinates within the specified range for Toronto
for i in range(num_toronto_features):
    random_lat = uniform(toronto_coordinates[0] - 0.2, toronto_coordinates[0] + 0.2)
    random_lon = uniform(toronto_coordinates[1] - 0.2, toronto_coordinates[1] + 0.2)

    # Check if the generated coordinates are within the specified range
    while geodesic(toronto_coordinates, (random_lat, random_lon)).kilometers > toronto_radius:
        random_lat = uniform(toronto_coordinates[0] - 0.2, toronto_coordinates[0] + 0.2)
        random_lon = uniform(toronto_coordinates[1] - 0.2, toronto_coordinates[1] + 0.2)

    # Create a feature dictionary
    feature = {
        "type": "Feature",
        "properties": {
            "id": f"toronto_feature{i + 1}",
            "mag": uniform(0, 5),  # Random magnitude value
            "time": 1507425650893,  # Example timestamp
        },
        "geometry": {
            "type": "Point",
            "coordinates": [random_lon, random_lat, 0.0]
        }
    }

    # Add the feature to the features list
    features.append(feature)

# Define the coordinates of Mississauga
mississauga_coordinates = (43.790, -79.8441)  # (latitude, longitude)

# Define the number of features you want for Mississauga
num_mississauga_features = 20

# Define the radius (in kilometers) around Mississauga (adjust as needed)
mississauga_radius = 10

# Generate random coordinates within the specified range for Mississauga
for i in range(num_mississauga_features):
    random_lat = uniform(mississauga_coordinates[0] - 0.2, mississauga_coordinates[0] + 0.2)
    random_lon = uniform(mississauga_coordinates[1] - 0.2, mississauga_coordinates[1] + 0.2)

    # Check if the generated coordinates are within the specified range
    while geodesic(mississauga_coordinates, (random_lat, random_lon)).kilometers > mississauga_radius:
        random_lat = uniform(mississauga_coordinates[0] - 0.2, mississauga_coordinates[0] + 0.2)
        random_lon = uniform(mississauga_coordinates[1] - 0.2, mississauga_coordinates[1] + 0.2)

    # Create a feature dictionary for Mississauga
    feature = {
        "type": "Feature",
        "properties": {
            "id": f"mississauga_feature{i + 1}",
            "mag": uniform(0, 5),  # Random magnitude value
            "time": 1507425650893,  # Example timestamp
        },
        "geometry": {
            "type": "Point",
            "coordinates": [random_lon, random_lat, 0.0]
        }
    }

    # Add the feature to the features list
    features.append(feature)

# Define the coordinates of Scarborough
scarborough_coordinates = (43.9800, -79.2070)  # (latitude, longitude)

# Define the number of features you want for Scarborough
num_scarborough_features = 20

# Define the radius (in kilometers) around Scarborough (adjust as needed)
scarborough_radius = 5

# Generate random coordinates within the specified range for Scarborough
for i in range(num_scarborough_features):
    random_lat = uniform(scarborough_coordinates[0] - 0.1, scarborough_coordinates[0] + 0.1)
    random_lon = uniform(scarborough_coordinates[1] - 0.1, scarborough_coordinates[1] + 0.1)

    # Check if the generated coordinates are within the specified range
    while geodesic(scarborough_coordinates, (random_lat, random_lon)).kilometers > scarborough_radius:
        random_lat = uniform(scarborough_coordinates[0] - 0.1, scarborough_coordinates[0] + 0.1)
        random_lon = uniform(scarborough_coordinates[1] - 0.1, scarborough_coordinates[1] + 0.1)

    # Create a feature dictionary for Scarborough
    feature = {
        "type": "Feature",
        "properties": {
            "id": f"scarborough_feature{i + 1}",
            "mag": uniform(0, 5),  # Random magnitude value
            "time": 1507425650893,  # Example timestamp
        },
        "geometry": {
            "type": "Point",
            "coordinates": [random_lon, random_lat, 0.0]
        }
    }

    # Add the feature to the features list
    features.append(feature)

# Create a GeoJSON dictionary
geojson = {
    "type": "FeatureCollection",
    "crs": {
        "type": "name",
        "properties": {"name": "urn:ogc:def:crs:OGC:1.3:CRS84"}
    },
    "features": features
}

# Convert the GeoJSON dictionary to a JSON string
geojson_string = json.dumps(geojson, indent=2)

# Write the JSON string to a file
with open("toronto_mississauga_scarborough_coordinates.geojson", "w") as geojson_file:
    geojson_file.write(geojson_string)

print('GeoJSON file "toronto_mississauga_scarborough_coordinates.geojson" has been generated.')
