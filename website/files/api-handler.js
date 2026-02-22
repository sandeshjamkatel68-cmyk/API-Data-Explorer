/**
 * API Handler Utility File
 * Demonstrates JavaScript best practices including:
 * - Loops (for, forEach, for...of, while)
 * - Conditionals (if/else, ternary)
 * - Switch cases
 * - Arrow functions
 * - Type conversions
 */

// API Configuration Object
const API_CONFIG = {
    baseUrl: 'https://jsonplaceholder.typicode.com',
    endpoints: {
        users: '/users',
        posts: '/posts',
        comments: '/comments',
        albums: '/albums',
        photos: '/photos',
        todos: '/todos'
    },
    timeout: 5000
};

// Utility Functions

/**
 * Type Conversion Examples
 */
class TypeConverter {
    // Convert string to number
    static toNumber(value) {
        // Using parseInt for integers
        if (String(value).includes('.')) {
            return parseFloat(value);
        }
        return parseInt(value, 10);
    }

    // Convert to string
    static toString(value) {
        return String(value);
    }

    // Convert to boolean
    static toBoolean(value) {
        // Using Boolean() and double negation
        return Boolean(value);
    }

    // Array conversion
    static toArray(value) {
        if (Array.isArray(value)) {
            return value;
        }
        return Array.from(value);
    }
}

/**
 * Data Processor Class
 * Demonstrates loops and conditionals
 */
class DataProcessor {
    constructor(data) {
        this.data = data;
    }

    // Filter data using arrow function and conditionals
    filterByCondition = (condition) => {
        const filtered = [];
        
        // For loop example
        for (let i = 0; i < this.data.length; i++) {
            // Conditional check
            if (condition(this.data[i])) {
                filtered.push(this.data[i]);
            }
        }
        
        return filtered;
    };

    // Map data transformation using forEach
    transformData = (transformer) => {
        const transformed = [];
        
        // forEach loop
        this.data.forEach((item, index) => {
            transformed.push(transformer(item, index));
        });
        
        return transformed;
    };

    // Find item using for...of loop
    findItem = (predicate) => {
        // For...of loop example
        for (const item of this.data) {
            if (predicate(item)) {
                return item;
            }
        }
        return null;
    };

    // Count items using while loop
    countMatching = (condition) => {
        let count = 0;
        let index = 0;
        
        // While loop example
        while (index < this.data.length) {
            if (condition(this.data[index])) {
                count++;
            }
            index++;
        }
        
        return count;
    };

    // Sort data with switch case for different sort types
    sortData = (sortType) => {
        const sortedData = [...this.data];
        
        // Switch case for different sort strategies
        switch (sortType) {
            case 'asc':
                return sortedData.sort((a, b) => {
                    const idA = TypeConverter.toNumber(a.id);
                    const idB = TypeConverter.toNumber(b.id);
                    return idA - idB;
                });
            
            case 'desc':
                return sortedData.sort((a, b) => {
                    const idA = TypeConverter.toNumber(a.id);
                    const idB = TypeConverter.toNumber(b.id);
                    return idB - idA;
                });
            
            case 'alpha':
                return sortedData.sort((a, b) => {
                    const nameA = String(a.name || a.title).toLowerCase();
                    const nameB = String(b.name || b.title).toLowerCase();
                    return nameA.localeCompare(nameB);
                });
            
            default:
                return sortedData;
        }
    };
}

/**
 * API Helper Functions
 */

// Arrow function for building API URL
const buildApiUrl = (endpoint, params = {}) => {
    let url = `${API_CONFIG.baseUrl}${endpoint}`;
    
    // Convert params object to query string
    const queryParams = Object.keys(params);
    
    // Conditional check if params exist
    if (queryParams.length > 0) {
        url += '?';
        
        // Loop through params using for...of
        for (const key of queryParams) {
            url += `${key}=${params[key]}&`;
        }
        
        // Remove trailing &
        url = url.slice(0, -1);
    }
    
    return url;
};

// Validate API response using conditionals
const validateResponse = (response) => {
    // Multiple conditional checks
    if (!response) {
        return { valid: false, message: 'No response received' };
    }
    
    if (typeof response !== 'object') {
        return { valid: false, message: 'Invalid response format' };
    }
    
    // Ternary operator for validation
    const hasData = Array.isArray(response) ? response.length > 0 : Object.keys(response).length > 0;
    
    return hasData 
        ? { valid: true, message: 'Valid response' }
        : { valid: false, message: 'Empty response' };
};

// Format data based on category using switch case
const formatDataByCategory = (data, category) => {
    const processor = new DataProcessor(data);
    
    switch (category) {
        case 'users':
            // Transform user data
            return processor.transformData((user) => ({
                id: TypeConverter.toNumber(user.id),
                name: TypeConverter.toString(user.name),
                email: TypeConverter.toString(user.email),
                company: user.company ? user.company.name : 'N/A'
            }));
        
        case 'posts':
            // Transform post data with type conversion
            return processor.transformData((post) => ({
                id: TypeConverter.toNumber(post.id),
                userId: TypeConverter.toNumber(post.userId),
                title: TypeConverter.toString(post.title),
                bodyLength: String(post.body).length
            }));
        
        case 'todos':
            // Filter completed todos
            return processor.filterByCondition((todo) => 
                TypeConverter.toBoolean(todo.completed)
            );
        
        default:
            return data;
    }
};

// Calculate statistics using loops
const calculateStatistics = (data) => {
    const stats = {
        total: 0,
        completed: 0,
        pending: 0,
        averageIdLength: 0
    };
    
    // Type conversion for total
    stats.total = TypeConverter.toNumber(data.length);
    
    let idSum = 0;
    
    // For loop to calculate statistics
    for (let i = 0; i < data.length; i++) {
        const item = data[i];
        
        // Conditional checks
        if (item.completed === true) {
            stats.completed++;
        } else if (item.completed === false) {
            stats.pending++;
        }
        
        // Type conversion and addition
        if (item.id) {
            idSum += TypeConverter.toNumber(item.id);
        }
    }
    
    // Calculate average
    stats.averageIdLength = stats.total > 0 
        ? (idSum / stats.total).toFixed(2) 
        : 0;
    
    return stats;
};

// Batch process data with error handling
const batchProcessData = async (dataArray, processor) => {
    const results = [];
    const errors = [];
    
    // For...of loop for async operations
    for (const item of dataArray) {
        try {
            const result = await processor(item);
            
            // Conditional push
            if (result) {
                results.push(result);
            }
        } catch (error) {
            errors.push({
                item: item,
                error: TypeConverter.toString(error.message)
            });
        }
    }
    
    return {
        results: results,
        errors: errors,
        successRate: `${((results.length / dataArray.length) * 100).toFixed(2)}%`
    };
};

// Search function with multiple conditions
const searchData = (data, searchTerm, searchFields) => {
    const term = String(searchTerm).toLowerCase();
    const matches = [];
    
    // Loop through data
    for (const item of data) {
        let matchFound = false;
        
        // Loop through search fields
        for (const field of searchFields) {
            // Conditional check if field exists
            if (item[field]) {
                const fieldValue = String(item[field]).toLowerCase();
                
                // Conditional check for match
                if (fieldValue.includes(term)) {
                    matchFound = true;
                    break;
                }
            }
        }
        
        // Add to matches if found
        if (matchFound) {
            matches.push(item);
        }
    }
    
    return matches;
};

// Group data by property
const groupByProperty = (data, property) => {
    const grouped = {};
    
    // forEach loop
    data.forEach((item) => {
        const key = item[property];
        
        // Conditional initialization
        if (!grouped[key]) {
            grouped[key] = [];
        }
        
        grouped[key].push(item);
    });
    
    return grouped;
};

// Priority sorting with switch case
const prioritySort = (data, priorityType) => {
    const sorted = [...data];
    
    switch (priorityType) {
        case 'high':
            // High priority items first
            return sorted.sort((a, b) => {
                const priorityA = a.priority || 0;
                const priorityB = b.priority || 0;
                return priorityB - priorityA;
            });
        
        case 'low':
            // Low priority items first
            return sorted.sort((a, b) => {
                const priorityA = a.priority || 0;
                const priorityB = b.priority || 0;
                return priorityA - priorityB;
            });
        
        case 'date':
            // Sort by date
            return sorted.sort((a, b) => {
                const dateA = new Date(a.date || 0);
                const dateB = new Date(b.date || 0);
                return dateB - dateA;
            });
        
        default:
            return sorted;
    }
};

// Export functions for use in main application
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        API_CONFIG,
        TypeConverter,
        DataProcessor,
        buildApiUrl,
        validateResponse,
        formatDataByCategory,
        calculateStatistics,
        batchProcessData,
        searchData,
        groupByProperty,
        prioritySort
    };
}

// Console logging examples demonstrating loops
console.log('=== JavaScript Utilities Loaded ===');

// Example 1: For loop
console.log('\n1. For Loop Example:');
for (let i = 0; i < 3; i++) {
    console.log(`Iteration ${i + 1}`);
}

// Example 2: While loop
console.log('\n2. While Loop Example:');
let counter = 0;
while (counter < 3) {
    console.log(`Counter: ${counter}`);
    counter++;
}

// Example 3: For...of loop
console.log('\n3. For...of Loop Example:');
const techStack = ['JavaScript', 'jQuery', 'Bootstrap'];
for (const tech of techStack) {
    console.log(`- ${tech}`);
}

// Example 4: Type conversions
console.log('\n4. Type Conversion Examples:');
console.log('String to Number:', TypeConverter.toNumber('123'));
console.log('Number to String:', TypeConverter.toString(456));
console.log('To Boolean:', TypeConverter.toBoolean(1));

// Example 5: Conditionals
console.log('\n5. Conditional Example:');
const value = 10;
if (value > 5) {
    console.log('Value is greater than 5');
} else {
    console.log('Value is 5 or less');
}

// Example 6: Switch case
console.log('\n6. Switch Case Example:');
const day = 'Monday';
switch (day) {
    case 'Monday':
        console.log('Start of the week');
        break;
    case 'Friday':
        console.log('End of work week');
        break;
    default:
        console.log('Mid-week day');
}

// Example 7: Arrow functions
console.log('\n7. Arrow Function Example:');
const multiply = (a, b) => a * b;
console.log('3 * 4 =', multiply(3, 4));

console.log('\n=== All Examples Executed ===');
