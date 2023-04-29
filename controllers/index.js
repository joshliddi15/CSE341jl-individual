goodFriend = (req, res) => {
  const name ='Paul Young';
  res.status(200).send(name);
};

module.exports = {goodFriend};
