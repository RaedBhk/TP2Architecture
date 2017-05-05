module.exports = {
    makeId: function () {
        var _Id = "";
        var possible = "0123456789";
        for (var i = 0; i < 20; i++)
            _Id += possible.charAt(Math.floor(Math.random() * possible.length));
        return _Id;
    }
};
