const dotenv = require('dotenv')
const mongoose = require('mongoose')

process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err)
    process.exit(1);
});

dotenv.config({ path: './config.env' })
const app = require('./app')

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('db connection successful')
})
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`app is running on ${port}....`);
})


// errors can extend beyond the realm of Express, as exemplified by issues in the MongoDB database connection. Consider a scenario where the database is inaccessible or if there's a problem with authentication. These errors fall outside the scope of our Express application, and thus, our implemented error handler won't capture them. To illustrate this, let's intentionally alter our MongoDB password, rendering the database connection impossible. Upon restarting the server, an unhandled promise rejection occurs, as shown in the log. This unhandled promise rejection signals that a promise in our code was rejected but lacked proper handling. Additionally, a deprecation warning indicates that, in the future, unhandled rejections might abruptly terminate the Node program.

//To address this issue, one might be tempted to handle the rejection directly at the point of connection. For instance, by adding a catch() handler to the connection code, we can mitigate the error locally. While this approach works in this simplified example, managing such rejections can become challenging in more extensive applications. To tackle unhandled promise rejections comprehensively, it's beneficial to implement a global solution. This ensures that, even in larger codebases, all unhandled promise rejections are accounted for.

//Let's explore a more robust approach to handling unhandled rejections. In an earlier section of the course, we delved into events and event listeners. Now, we can leverage this knowledge. Whenever there's an unhandled rejection in our application, the process object emits an event called "unhandledRejection." By subscribing to this event using process.on(), we can create a global event listener. This listener receives the error object, allowing us to log relevant information such as the error name and message. This global event handler acts as a safety net, capturing any unhandled promise rejections that might slip through various parts of our application. This ensures a centralized and consistent approach to handling unforeseen errors, providing a safety mechanism for the unpredictable nature of programming.


//lets assume we encounter a scenario where there's an issue with the database connection. In such critical situations, where the application cannot function properly, the best course of action is to gracefully shut down the application. We achieve this using process.exit. However, there's a caveat with this approach - it's an abrupt way to end the program, immediately aborting all currently running or pending requests. This may not be ideal.

//To address this, a more graceful shutdown mechanism is introduced. Before invoking process.exit, we first save the server instance returned by app.listen to a variable. Then, we call server.close to gracefully close the server. This action allows the server to finish handling any pending requests before shutting down. This approach is more considerate and aligns with best practices, particularly in production environments.

//https://www.geeksforgeeks.org/node-js-process-unhandledrejection-event/

process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err);
    server.close(() => {
        process.exit(1);
    });
});


//Uncaught exceptions in Node.js refer to errors or bugs in synchronous code that are not handled anywhere in the application. Similar to unhandled rejections, uncaught exceptions can be addressed by setting up an event listener for the "uncaughtException" 

//It's crucial to position the uncaught exception handler at the beginning of the code or, at the very least, before any other code executes. This ensures that the handler is ready to catch exceptions from the start of the application.

//While handling errors where they occur is considered a good practice, having these event handlers serves as a safety net. In production, additional tools or services may automatically restart the application after a crash, minimizing downtime

//Note: Relying solely on unhandled exception handlers is not recommended. It is advisable to handle errors at the source, where they occur, to create more robust and maintainable code.

//https://dev.to/superiqbal7/catching-unhandled-promise-rejections-and-uncaughtexception-in-nodejs-2403