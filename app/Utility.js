class Utility {
    static getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    static getRandomString(length) {
        var possibleCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";

        var exitString = "";

        for (var i = 0; i < length; i++) {
            var letter = this.getRandomInt(0, possibleCharacters.length);
            exitString = exitString + possibleCharacters[letter];
        }

        return exitString;
    }
}

module.exports = Utility;