"use strict";
/*
 Copyright (C) 2012-2013 Grant Galitz
 
 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 
 The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

function ImportSaveCallback(name) {
    try {
        var save = findValue("SAVE_" + name);
        if (save != null) {
            writeRedTemporaryText("Loaded save.");
            return base64ToArray(save);
        }
    }
    catch (error) {
        alert("Could not read save: " + error.message);
    }
    return null;
}
function ExportSave() {
    Iodine.exportSave();
}

//mk's save export test
function import_save(blobData) {
    blobData = decodeBlob(blobData);
    if (blobData && blobData.blobs) {
        if (blobData.blobs.length > 0) {
            for (var index = 0; index < blobData.blobs.length; ++index) {
                var blobID = blobData.blobs[index].blobID;
                var blobContent = blobData.blobs[index].blobContent;
                writeRedTemporaryText("Importing blob \"" + blobID + "\"");
                if (blobContent) {
                    setValue(blobID, blobContent);
                }
                else if (blobID) {
                    writeRedTemporaryText("Save file imported had blob \"" + blobID + "\" with no blob data interpretable.");
                }
                else {
                    writeRedTemporaryText("Blob chunk information missing completely.");
                }
            }
        }
        else {
            writeRedTemporaryText("Could not decode the imported file.");
        }
    }
    else {
        writeRedTemporaryText("Could not decode the imported file.");
    }

}
 
 function generateBlob(keyName, encodedData) {
    //Append the file format prefix:
    var saveString = "EMULATOR_DATA";
    var consoleID = "GameBoyAdvance";
    //Figure out the length:
    var totalLength = (saveString.length + 4 + (1 + consoleID.length)) + ((1 + keyName.length) + (4 + encodedData.length));
    //Append the total length in bytes:
    saveString += to_little_endian_word(totalLength);
    //Append the console ID text's length:
    saveString += to_byte(consoleID.length);
    //Append the console ID text:
    saveString += consoleID;
    //Append the blob ID:
    saveString += to_byte(keyName.length);
    saveString += keyName;
    //Now append the save data:
    saveString += to_little_endian_word(encodedData.length);
    saveString += encodedData;
    return saveString;
}
 
function ExportSaveCallback(name, save) {
    if (name != "") {
        try {
            setValue("SAVE_" + name, arrayToBase64(save));
        }
        catch (error) {
            alert("Could not store save: " + error.message);
        }
    }
}
function registerSaveHandlers() {
    Iodine.attachSaveExportHandler(ExportSaveCallback);
    Iodine.attachSaveImportHandler(ImportSaveCallback);
}
//Wrapper for localStorage getItem, so that data can be retrieved in various types.
function findValue(key) {
    try {
        if (window.localStorage.getItem(key) != null) {
            return JSON.parse(window.localStorage.getItem(key));
        }
    }
    catch (error) {
        //An older Gecko 1.8.1/1.9.0 method of storage (Deprecated due to the obvious security hole):
        if (window.globalStorage[location.hostname].getItem(key) != null) {
            return JSON.parse(window.globalStorage[location.hostname].getItem(key));
        }
    }
    return null;
}
//Wrapper for localStorage setItem, so that data can be set in various types.
function setValue(key, value) {
    try {
        window.localStorage.setItem(key, JSON.stringify(value));
    }
    catch (error) {
        //An older Gecko 1.8.1/1.9.0 method of storage (Deprecated due to the obvious security hole):
        window.globalStorage[location.hostname].setItem(key, JSON.stringify(value));
    }
}
//Wrapper for localStorage removeItem, so that data can be set in various types.
function deleteValue(key) {
    try {
        window.localStorage.removeItem(key);
    }
    catch (error) {
        //An older Gecko 1.8.1/1.9.0 method of storage (Deprecated due to the obvious security hole):
        window.globalStorage[location.hostname].removeItem(key);
    }
}
