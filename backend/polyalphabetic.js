export function encrypt(plaintext, keys) {
    // Objects to store the 2nd, 3rd, and 4th keys
    let key1 = { key: keys[1] }; // No conversion to uppercase
    let key2 = { key: keys[2] }; // No conversion to uppercase
    let key3 = { key: keys[3] }; // No conversion to uppercase

    // Create an array of the alphabet (uppercase, lowercase), digits, space, and symbols to total 81 characters
    let alphabetAndSymbols =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +   // 26 uppercase letters
        "abcdefghijklmnopqrstuvwxyz" +   // 26 lowercase letters
        "0123456789" +                     // 10 digits
        ": @#$%&*!?.,-[]{}()";             // 19 symbols including space

    // Split into an array of characters
    let characterSet = alphabetAndSymbols.split('');

    // Helper function to create a 9x9 2D array
    function createKeyGrid(key) {
        let keyArray = key.split('');  // No conversion to uppercase, keep original case
        let usedCharacters = new Set(keyArray);  // Track used characters
        let grid = [];

        let index = 0;

        // Fill the grid with the key characters first
        for (let row = 0; row < 9; row++) {
            let gridRow = [];
            for (let col = 0; col < 9; col++) {
                if (index < keyArray.length) {
                    gridRow.push(keyArray[index++]);  // Add key characters first
                } else {
                    // Fill remaining spaces with characters from alphabetAndSymbols not in the key
                    for (let i = 0; i < characterSet.length; i++) {
                        if (!usedCharacters.has(characterSet[i])) {
                            gridRow.push(characterSet[i]);
                            usedCharacters.add(characterSet[i]);  // Mark character as used
                            break;
                        }
                    }
                }
            }
            grid.push(gridRow);
        }

        return grid;
    }

    // Function to find the position of a character in the 9x9 grid
    function findPositionInGrid(grid, char) {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (grid[row][col] === char) {
                    return [row, col]; // Return row and col as an array
                }
            }
        }
        return null; // In case the character isn't found (shouldn't happen if all chars are handled)
    }

    // Function to apply the cipher (invert positions)
    function applyCipher(grid, char) {
        let pos = findPositionInGrid(grid, char);
        if (pos) {
            let [row, col] = pos;
            return grid[col][row]; // Swap row and column for inverted position
        }
        return char; // If character isn't found (e.g., space or unknown symbol), return it unchanged
    }

    // Create 3 grids based on the keys
    let grid1 = createKeyGrid(key1.key);
    let grid2 = createKeyGrid(key2.key);
    let grid3 = createKeyGrid(key3.key);

    // Log the grids to the console
    console.log('Grid 1:', grid1);
    console.log('Grid 2:', grid2);
    console.log('Grid 3:', grid3);

    // Cipher the text by applying each grid transformation in sequence
    let ciphertext = '';

    for (let i = 0; i < plaintext.length; i++) {
        let char = plaintext[i];

        // Apply the cipher transformation from each grid
        char = applyCipher(grid1, char);  // Apply first grid transformation
        char = applyCipher(grid2, char);  // Apply second grid transformation
        char = applyCipher(grid3, char);  // Apply third grid transformation

        // Add the transformed character to the ciphertext
        ciphertext += char;
    }

    return ciphertext;
}

export function decrypt(ciphertext, keys) {
    // Objects to store the 2nd, 3rd, and 4th keys
    let key1 = { key: keys[1] }; // No conversion to uppercase
    let key2 = { key: keys[2] }; // No conversion to uppercase
    let key3 = { key: keys[3] }; // No conversion to uppercase

    // Create an array of the alphabet (uppercase, lowercase), digits, space, and symbols to total 81 characters
    let alphabetAndSymbols =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +   // 26 uppercase letters
        "abcdefghijklmnopqrstuvwxyz" +   // 26 lowercase letters
        "0123456789" +                     // 10 digits
        ": @#$%&*!?.,-[]{}()";             // 19 symbols including space

    // Split into an array of characters
    let characterSet = alphabetAndSymbols.split('');

    // Helper function to create a 9x9 2D array
    function createKeyGrid(key) {
        let keyArray = key.split('');  // No conversion to uppercase, keep original case
        let usedCharacters = new Set(keyArray);  // Track used characters
        let grid = [];

        let index = 0;

        // Fill the grid with the key characters first
        for (let row = 0; row < 9; row++) {
            let gridRow = [];
            for (let col = 0; col < 9; col++) {
                if (index < keyArray.length) {
                    gridRow.push(keyArray[index++]);  // Add key characters first
                } else {
                    // Fill remaining spaces with characters from alphabetAndSymbols not in the key
                    for (let i = 0; i < characterSet.length; i++) {
                        if (!usedCharacters.has(characterSet[i])) {
                            gridRow.push(characterSet[i]);
                            usedCharacters.add(characterSet[i]);  // Mark character as used
                            break;
                        }
                    }
                }
            }
            grid.push(gridRow);
        }

        return grid;
    }

    // Function to find the position of a character in the 9x9 grid
    function findPositionInGrid(grid, char) {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (grid[row][col] === char) {
                    return [row, col]; // Return row and col as an array
                }
            }
        }
        return null; // In case the character isn't found (shouldn't happen if all chars are handled)
    }

    // Function to apply the cipher (invert positions)
    function applyCipher(grid, char) {
        let pos = findPositionInGrid(grid, char);
        if (pos) {
            let [row, col] = pos;
            return grid[col][row]; // Swap row and column for inverted position
        }
        return char; // If character isn't found (e.g., space or unknown symbol), return it unchanged
    }

    // Create 3 grids based on the keys in reverse order
    let grid1 = createKeyGrid(key3.key);
    let grid2 = createKeyGrid(key2.key);
    let grid3 = createKeyGrid(key1.key);

    // Log the grids to the console
    console.log('Grid 1 (Decrypt):', grid1);
    console.log('Grid 2 (Decrypt):', grid2);
    console.log('Grid 3 (Decrypt):', grid3);

    // Cipher the text by applying each grid transformation in reverse order
    let plainText = '';

    for (let i = 0; i < ciphertext.length; i++) {
        let char = ciphertext[i];

        // Apply the cipher transformation from each grid in reverse order
        char = applyCipher(grid1, char);  // Apply third grid transformation
        char = applyCipher(grid2, char);  // Apply second grid transformation
        char = applyCipher(grid3, char);  // Apply first grid transformation

        // Add the transformed character to the decrypted text
        plainText += char;
    }

    return plainText;
}

// Test function to run the encrypt and decrypt functions
/*
function testEncryptDecrypt() {
    let plaintext = "The quick brown fox jumps over the lazy dog.";
    let keys = ["group1", "phone", "tower", "cheat"];

    let ciphertext = encrypt(plaintext, keys);
    let decryptedText = decrypt(ciphertext, keys);

    console.log("Plaintext:", plaintext);
    console.log("Keys:", keys);
    console.log("Ciphertext:", ciphertext);
    console.log("Decrypted Text:", decryptedText);
}

// Run the test
testEncryptDecrypt();
*/
