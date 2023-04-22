const TokenNotify = require("../models/tokenNotifyModal");

const tokenNotifyCtrl = {
  getToken: async (req, res) => {
    try {
      const tokens = await TokenNotify.find();
      return res.status(200).json(tokens);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getTokenByIdUser: async (req, res) => {
    try {
      const {userId} = req.params;
      const tokens = await TokenNotify.findOne({userId: userId});
      return res.status(200).json(tokens);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createTokenNotify: async (req, res) => {
    try {
      const { userId, token } = req.body;
      const tokenExisted = await TokenNotify.findOne({
        token: token,
      });
      if (tokenExisted) {
        return res.status(500).json({ msg: "Token existed." });
      }
      const newToken = new TokenNotify({
        userId,
        token,
      });
      await newToken.save();
      return res.status(200).json({ token, message: "Add token successed" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateTokenNotify: async (req, res) => {
    try {
      const {token} = req.params;
      console.log("token", token);
      console.log(req.body);
      const drive = await TokenNotify.updateMany({ token:token }, { $set: req.body });
      return res.status(200).json({ msg: "Update success!!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  removeTokenNotify: async (req, res) => {
    try {
      const notify = await TokenNotify.findOneAndDelete({
        userId: req.params.userId,
      });
      return res
        .status(200)
        .json({ notify, messenger: "Remove token successed" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  removeAllTokenNotify: async (req, res) => {
    try {
      const notify = await TokenNotify.remove();
      return res
        .status(200)
        .json({ notify, messenger: "Remove token successed" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = tokenNotifyCtrl;
