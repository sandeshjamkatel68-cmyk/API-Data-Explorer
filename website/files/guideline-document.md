# Website Development Guidelines - jQuery, Bootstrap & AJAX Integration

## Table of Contents

1. [Introduction](#1-introduction)
2. [Technical Stack Overview](#2-technical-stack-overview)
3. [Project Structure](#3-project-structure)
4. [HTML Structure Guidelines](#4-html-structure-guidelines)
   - 4.1 [Head Section](#41-head-section)
   - 4.2 [Header & Menu Bar](#42-header--menu-bar)
   - 4.3 [Hero Section](#43-hero-section)
   - 4.4 [Side Menu Sections](#44-side-menu-sections)
   - 4.5 [Footer Section](#45-footer-section)
5. [Bootstrap Implementation](#5-bootstrap-implementation)
6. [CSS Styling Guidelines](#6-css-styling-guidelines)
7. [JavaScript & jQuery Best Practices](#7-javascript--jquery-best-practices)
   - 7.1 [Loops](#71-loops)
   - 7.2 [Conditionals](#72-conditionals)
   - 7.3 [Switch Cases](#73-switch-cases)
   - 7.4 [Arrow Functions](#74-arrow-functions)
   - 7.5 [Type Conversion](#75-type-conversion)
8. [AJAX Integration](#8-ajax-integration)
9. [API Data Population](#9-api-data-population)
10. [Table Grid View with Pagination](#10-table-grid-view-with-pagination)
11. [Image Management](#11-image-management)
12. [Complete Code Example](#12-complete-code-example)
13. [Testing & Debugging](#13-testing--debugging)
14. [Best Practices Summary](#14-best-practices-summary)

---

## 1. Introduction

This guideline document provides comprehensive instructions for building a responsive website using jQuery, Bootstrap, and AJAX. The website will feature dynamic content loading from public APIs, organized in a table grid view with pagination functionality.

**Purpose**: Create a modern, interactive web application demonstrating key JavaScript concepts and API integration.

---

## 2. Technical Stack Overview

| Technology | Version | Purpose |
|------------|---------|---------|
| HTML5 | - | Structure and content |
| CSS3 | - | Styling and layout |
| Bootstrap | 5.3.x | Responsive framework |
| jQuery | 3.7.x | DOM manipulation & AJAX |
| JavaScript (ES6+) | - | Programming logic |
| Public API | Various | Dynamic data source |

---

## 3. Project Structure

```
project/
│
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── main.js
│   └── api-handler.js
├── images/
│   ├── hero-image.jpg
│   ├── logo.png
│   └── sidebar-banner.jpg
└── README.md
```

---

## 4. HTML Structure Guidelines

### 4.1 Head Section

The head section should include:
- Meta tags for charset and viewport
- Title tag
- Bootstrap CSS CDN
- Custom CSS file
- jQuery library
- Bootstrap JS bundle

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Website Title</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="css/styles.css">
</head>
```

### 4.2 Header & Menu Bar

Use Bootstrap's navbar component:
- Brand/logo
- Navigation links
- Responsive collapse menu
- Data attributes for API categories

### 4.3 Hero Section

Primary content area featuring:
- Dynamic content container
- Loading indicators
- Table grid for API data
- Pagination controls

### 4.4 Side Menu Sections

Left and right sidebars containing:
- Quick links
- Additional navigation
- Promotional banners with images
- Complementary content

### 4.5 Footer Section

Standard footer with:
- Copyright information
- Social media links
- Contact details
- Additional navigation

---

## 5. Bootstrap Implementation

**Grid System Usage**:
```html
<div class="container-fluid">
    <div class="row">
        <div class="col-md-2">Left Sidebar</div>
        <div class="col-md-8">Main Content</div>
        <div class="col-md-2">Right Sidebar</div>
    </div>
</div>
```

**Key Bootstrap Classes**:
- `navbar`, `navbar-expand-lg` - Navigation bar
- `container`, `container-fluid` - Layout containers
- `row`, `col-*` - Grid system
- `table`, `table-striped` - Table styling
- `btn`, `btn-primary` - Buttons
- `card`, `card-body` - Card components

---

## 6. CSS Styling Guidelines

**Custom CSS Organization**:

1. **Reset & Base Styles**
2. **Layout Styles** (header, footer, sidebars)
3. **Component Styles** (tables, buttons, cards)
4. **Utility Classes**
5. **Responsive Media Queries**

**Example Structure**:
```css
/* Base Styles */
body {
    font-family: 'Arial', sans-serif;
    background-color: #f8f9fa;
}

/* Header Styles */
.navbar {
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* Hero Section */
#hero-section {
    min-height: 500px;
    padding: 40px 0;
}
```

---

## 7. JavaScript & jQuery Best Practices

### 7.1 Loops

**For Loop Example**:
```javascript
// Traditional for loop
for (let i = 0; i < data.length; i++) {
    console.log(data[i]);
}

// For...of loop (ES6)
for (const item of data) {
    console.log(item);
}

// forEach with array
data.forEach((item, index) => {
    console.log(`Item ${index}: ${item}`);
});
```

### 7.2 Conditionals

**If-Else Statements**:
```javascript
if (response.status === 200) {
    displayData(response.data);
} else if (response.status === 404) {
    showError('Data not found');
} else {
    showError('An error occurred');
}

// Ternary operator
const message = isLoading ? 'Loading...' : 'Ready';
```

### 7.3 Switch Cases

**Category Selection Example**:
```javascript
switch (category) {
    case 'users':
        apiUrl = 'https://jsonplaceholder.typicode.com/users';
        break;
    case 'posts':
        apiUrl = 'https://jsonplaceholder.typicode.com/posts';
        break;
    case 'todos':
        apiUrl = 'https://jsonplaceholder.typicode.com/todos';
        break;
    default:
        apiUrl = 'https://jsonplaceholder.typicode.com/users';
}
```

### 7.4 Arrow Functions

**Modern Function Syntax**:
```javascript
// Traditional function
function processData(data) {
    return data.map(item => item.name);
}

// Arrow function
const processData = (data) => {
    return data.map(item => item.name);
};

// Concise arrow function
const getNames = data => data.map(item => item.name);

// Arrow function in callbacks
$.ajax({
    url: apiUrl,
    success: (data) => {
        displayData(data);
    }
});
```

### 7.5 Type Conversion

**Type Conversion Examples**:
```javascript
// String to Number
const pageNumber = parseInt($('#page-input').val());
const price = parseFloat('19.99');
const quantity = Number('42');

// Number to String
const pageString = String(currentPage);
const total = (100).toString();

// Boolean conversion
const isActive = Boolean(userStatus);
const hasData = !!response.data;

// Array conversion
const arrayFromString = Array.from('hello');
```

---

## 8. AJAX Integration

**jQuery AJAX Pattern**:

```javascript
const fetchAPIData = (endpoint, category) => {
    // Show loading indicator
    $('#loading-spinner').show();
    $('#data-table').hide();
    
    $.ajax({
        url: endpoint,
        method: 'GET',
        dataType: 'json',
        success: (response) => {
            // Type conversion example
            const dataArray = Array.isArray(response) ? response : [response];
            
            // Hide loading, show table
            $('#loading-spinner').hide();
            $('#data-table').show();
            
            // Process and display data
            displayTableData(dataArray, category);
        },
        error: (xhr, status, error) => {
            $('#loading-spinner').hide();
            showErrorMessage(`Error: ${error}`);
            console.error('AJAX Error:', status, error);
        }
    });
};
```

---

## 9. API Data Population

**Dynamic Table Population**:

```javascript
const displayTableData = (data, category) => {
    const tbody = $('#data-tbody');
    tbody.empty(); // Clear existing data
    
    // Loop through data using forEach
    data.forEach((item, index) => {
        let row = '<tr>';
        
        // Switch case for different data structures
        switch (category) {
            case 'users':
                row += `<td>${item.id}</td>`;
                row += `<td>${item.name}</td>`;
                row += `<td>${item.email}</td>`;
                row += `<td>${item.phone}</td>`;
                break;
            case 'posts':
                row += `<td>${item.id}</td>`;
                row += `<td>${item.title}</td>`;
                row += `<td>${item.body.substring(0, 50)}...</td>`;
                break;
            default:
                row += `<td>${item.id}</td>`;
                row += `<td>${JSON.stringify(item)}</td>`;
        }
        
        row += '</tr>';
        tbody.append(row);
    });
};
```

---

## 10. Table Grid View with Pagination

**Pagination Implementation**:

```javascript
class Pagination {
    constructor(data, itemsPerPage = 10) {
        this.data = data;
        this.itemsPerPage = parseInt(itemsPerPage); // Type conversion
        this.currentPage = 1;
        this.totalPages = Math.ceil(data.length / this.itemsPerPage);
    }
    
    // Arrow function for getting current page data
    getCurrentPageData = () => {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return this.data.slice(start, end);
    };
    
    // Render pagination controls
    renderControls() {
        let html = '<nav><ul class="pagination justify-content-center">';
        
        // Previous button
        const prevDisabled = this.currentPage === 1 ? 'disabled' : '';
        html += `<li class="page-item ${prevDisabled}">
                    <a class="page-link" href="#" data-page="prev">Previous</a>
                 </li>`;
        
        // Page numbers loop
        for (let i = 1; i <= this.totalPages; i++) {
            const active = i === this.currentPage ? 'active' : '';
            html += `<li class="page-item ${active}">
                        <a class="page-link" href="#" data-page="${i}">${i}</a>
                     </li>`;
        }
        
        // Next button
        const nextDisabled = this.currentPage === this.totalPages ? 'disabled' : '';
        html += `<li class="page-item ${nextDisabled}">
                    <a class="page-link" href="#" data-page="next">Next</a>
                 </li>`;
        
        html += '</ul></nav>';
        
        $('#pagination-controls').html(html);
    }
}
```

---

## 11. Image Management

**Image Integration Guidelines**:

1. **File Formats**: Use JPG for photos, PNG for graphics with transparency, SVG for icons
2. **Optimization**: Compress images before deployment
3. **Responsive Images**: Use Bootstrap's `img-fluid` class
4. **Alt Text**: Always provide descriptive alt attributes

**Example Usage**:
```html
<!-- Hero Section Image -->
<div class="hero-image-container">
    <img src="images/hero-image.jpg" alt="Hero Banner" class="img-fluid">
</div>

<!-- Sidebar Banner -->
<div class="sidebar-banner">
    <img src="images/sidebar-banner.jpg" alt="Promotional Banner" class="img-fluid rounded">
</div>

<!-- Logo in Navbar -->
<img src="images/logo.png" alt="Company Logo" height="40">
```

---

## 12. Complete Code Example

See the accompanying `index.html` demo file for a complete working example implementing all guidelines.

---

## 13. Testing & Debugging

**Testing Checklist**:
- [ ] All menu items trigger AJAX calls
- [ ] Data populates correctly in table format
- [ ] Pagination works on all pages
- [ ] Responsive design on mobile/tablet/desktop
- [ ] Images load properly
- [ ] No console errors
- [ ] Loading indicators display
- [ ] Error handling works

**Debugging Tools**:
- Browser Developer Console (F12)
- Network tab for AJAX requests
- jQuery selectors verification
- Breakpoints in JavaScript code

---

## 14. Best Practices Summary

1. ✅ **Use semantic HTML5** elements
2. ✅ **Implement responsive design** with Bootstrap grid
3. ✅ **Modularize JavaScript** code into functions
4. ✅ **Handle errors gracefully** in AJAX calls
5. ✅ **Use const/let** instead of var
6. ✅ **Implement arrow functions** for cleaner syntax
7. ✅ **Comment your code** for maintainability
8. ✅ **Validate user input** before processing
9. ✅ **Optimize images** for web performance
10. ✅ **Test cross-browser compatibility**

---

**Document Version**: 1.0  
**Last Updated**: February 2026  
**Author**: Development Team

