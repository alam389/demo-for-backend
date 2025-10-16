// Server entry point
// This is the file that starts your application

const app = require('./src/app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(` Server is running on port ${PORT}`);
    console.log(` API available at: http://localhost:${PORT}/api/tools`);
});
