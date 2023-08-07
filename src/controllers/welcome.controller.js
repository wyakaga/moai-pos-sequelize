module.exports = {
  welcomeMessage: (req, res) => {
    res.status(200).json({
      status: 200,
      msg: 'Welcome to 🗿 point of sale!',
      authors: [
        {
          name: 'wyakaga',
          repository: 'https://github.com/wyakaga',
        },
      ],
    });
  },
};
