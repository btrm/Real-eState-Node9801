module.exports = {
  home: (req, res) => {
    try {
      res.send("Home Page");
    } catch (e) {
      console.log(e);
    }
  }
};
