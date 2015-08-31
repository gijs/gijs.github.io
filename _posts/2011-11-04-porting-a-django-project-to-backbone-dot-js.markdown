---
layout: post
title: "Porting a Django project to Backbone.js"
date: 2011-11-04 10:44
comments: true
published: false
#categories: javascript development programming python django
---
For a recent project, I was asked to improve and 'port' an existing Java application to Django. We chose Django because most of the developers around are familiar with this framework and with Python. 

In short, the existing application was a traditional Java GUI 'single page application' that looked like this:



Entering a value in one of the input fields and clicking the calculate button resulted in a recalculation of the model.

An idea was coined for the new version to use a multi-form 'wizard' paradigm:

* Step 1: The user specifies a project title, his/her name, a date and the three values needed for all subsequent calculations
* Step 2: The intermediate results of the calculation are presented as well as three choices for continued calculations.
* Step 3: The user chooses one of three calculations, and enters the additionally required values.
* Step 4: A summary with the input and the results is shown.
* Step 5: A PDF is rendered with the same values as the summary.
 
So, that's what I set out to do.

My Django approach
------------------
Django's [Form Wizard](https://docs.djangoproject.com/en/dev/ref/contrib/formtools/form-wizard/) seemed to offer some sort of starting point, but it turned out to be just some sort of [Factory pattern](http://en.wikipedia.org/wiki/Factory_method_pattern) around the Django Forms library, nothing more. It doesn't out-of-the-box facilitate in things like multiple paths in the wizard. I was clearly expecting too much and had to roll this myself.
Time was scarce in this project so I didn't think about other approaches.
In short, I took the following route to get to the end product:

* Defined a 'urlconfig' for every step.
* Defined view methods for every step.
* Defined form classes for every step.
* Defined several templates.

The goal of the product is to generate a PDF report with the results of the calculations, that's why there's no need for persistence of saving of data, although persistence was offered by storing form values in session variables.