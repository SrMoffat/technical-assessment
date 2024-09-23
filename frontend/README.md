Introduction to Credrails
This is an opportunity for you to showcase your technical skills and
creativity.

You’ll be tasked with building something that’s central to what we do
here—enabling seamless and efficient data handling.

Not only is this a chance to
dive into interesting challenges, but it’s also a glimpse into the kind of impact your
work could have on real-world financial problems across the continent.

You’re not just completing an assessment—you’re contributing to solutions that
could be the backbone of Africa’s financial infrastructure. 

We believe in ownership,
innovation, and growth, and this project will give you a taste of how we work at
Credrails.

To make things even more exciting, you’ll have 3 days to complete the task. We
encourage you to take ownership, be creative, and show us your best work!

Take home assessment
Create a Django project with a REST API using Django REST Framework (DRF) to
handle file uploads and reconciliation processing.

Backend (Python + Django)
1. Implement an endpoint to accept two CSV files (source and target) for
reconciliation.
2. Implement data normalization logic to handle potential data transformation
issues (e.g., date formats, case sensitivity, leading/trailing spaces).
3. Implement reconciliation logic:
4. Identify records present in source but missing in target and vice versa.
5. Compare records that exist in both files to identify discrepancies in specific
fields.

6. Implement an endpoint to return the reconciliation report in a desired format
(CSV, HTML, or JSON).
Frontend (React.js)
1. Create a React application to provide a user-friendly interface for file uploads
and displaying the reconciliation results.
2. File Upload Form: Two separate file inputs for the source and target CSV files.
A submit button to send the files to the backend for reconciliation.
3. Use Redux or React Context to manage the state of the application, including:

Reconciliation Results Display:
After successful upload and processing, display the results:
1. Records missing in the target.
2. Records missing in the source.
3. Records with discrepancies, highlighting the fields that differ.
4. Error Handling:
5. Display error messages if the file upload fails or if there are validation errors.

Submission instructions
Upload the project to Github with clear readme instructions along with atomic
commit messages and share the repositories when you submit your test.



1. Omissions: Ones that are in source but not in target and vice versa
2. Timing Differences: Entry exists in target and source but they have different dates
2. Value Differences: Entry exists in target and source but they have different amounts
2. Narrative Differences: Entry exists in target and source but they have different narratives
2. Errorroneous Differences: Differences caused by human error
3.