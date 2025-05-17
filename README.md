Step 1: Set Up Environment Variables
First, set the environment variables CLOUDANT_USERNAME and CLOUDANT_API_KEY to allow the app to connect to the IBM Cloudant database securely.

Step 2: Install Required Packages
Install all the Python packages needed for this project by running the command to install dependencies from the requirements file.

Step 3: Run the Flask Backend
Run the Flask application on your local machine. This will start the server on port 5000, which listens for API requests from the frontend.

Step 4: Open the Frontend Interface
Open the index.html file located in the frontend directory using a web browser. The frontend allows you to create events, list upcoming events, and submit RSVPs.

Step 5: Create Events
Use the frontend form to input the event title, date, and description, then submit to create new events stored in the Cloudant database.

Step 6: View Upcoming Events
Refresh the events list on the frontend to see all upcoming events fetched from the backend.

Step 7: RSVP to Events
Fill in the RSVP form with your name, email, and the event ID, then submit to RSVP to a particular event.

Step 8: Optional - Use Docker
You can containerize the application by building a Docker image and running the container, setting the necessary environment variables for Cloudant credentials.

Step 9: Optional - Deploy to Kubernetes
Deploy the application to a Kubernetes cluster by applying the secret, deployment, and service manifests. This will create a scalable, load-balanced application running in the cluster.

Step 10: Test the Complete Workflow
Finally, test the entire application by creating events, viewing them, and submitting RSVPs to ensure everything works as expected.
<img width="1148" alt="image" src="https://github.com/user-attachments/assets/801e232b-df7f-492a-8531-e3b87c47070b" />
