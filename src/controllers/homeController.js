const getHomepage =  (req, res) => {
    res.send('Hello World! Im tuan')
}
const getABC = (req, res) => {
    res.send('Check route!')
}
const getABCHTML = (req, res) => {
    res.render('sample.ejs');
}
module.exports = {
    getHomepage, getABC, getABCHTML
}

