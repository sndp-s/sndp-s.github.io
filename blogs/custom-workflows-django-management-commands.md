---
title: Using Django’s Custom Management Commands to Execute Workflows with Application Context
date: 2025-07-20
layout: layouts/blog.njk
---

At a previous job, one of my colleagues was tasked with a one-off project: processing a large number of files (over 20,000, if I recall correctly) using a third-party service and storing a subset of the results in our database. Here's a breakdown of how we approached it.

Ideally, we would’ve used a bulk API: upload all files in one go, receive the processed results, and save them to the database. Unfortunately, the third-party service didn’t support bulk processing at the time — only single-file operations were available. This meant we had to process files serially.

We also wanted to leverage our existing Django application — its models, settings, and utility functions — to perform the task efficiently and consistently.

One idea was to use the Django shell (`python manage.py shell`) to import the necessary objects and orchestrate the process manually. This could have worked, and technically we might have added threading for some performance gains.

But using the shell this way quickly became cumbersome and error-prone for such a large task.

So we considered a few options:

- Setting up **Celery** and workers to queue and handle the jobs
- Writing a standalone script that used Django's context
- Creating a **custom Django management command**

Since this was a one-time task and didn’t justify setting up a full queuing system like Celery, we decided to go with the third option: a custom Django management command.

This solution gave us a clean way to structure the code and run it via `python manage.py process_files`. More importantly, it let us run everything within the Django application context — giving seamless access to models, settings, and business logic without additional boilerplate.
