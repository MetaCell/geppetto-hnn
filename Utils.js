import React from 'react';
import {
  execPythonMessage, 
  evalPythonMessage
} from '../../js/communication/geppettoJupyter/GeppettoJupyterUtils';


const Utils = {

    getHTMLType: function (type) {

        switch (type) {
            case "int":
                var htmlType = "number"
                break;
            default:
                var htmlType = "text"
                break;
        }
        return htmlType;

    },

    isObject: function (item) {
        return (item && typeof item === 'object' && !Array.isArray(item));
    },
    
    //FIXME: Hack to remove scaped chars (\\ -> \ and \' -> ') manually
    convertToJSON(data){
        if (typeof data === 'string' || data instanceof String){
            return JSON.parse(data.replace(/\\\\/g, '\\').replace(/\\'/g, '\''))
        }
        return data
    },

    getErrorResponse(data){
        var parsedData = this.convertToJSON(data)
        if (parsedData.hasOwnProperty("type") && parsedData['type'] == 'ERROR'){
            return {'message': parsedData['message'], 'details' : parsedData['details']}
        }
        return null;
    },

    parsePythonException(exception){
        return <pre dangerouslySetInnerHTML={{__html: IPython.utils.fixConsole(exception)}}></pre>
    },

    execPythonMessage,
    evalPythonMessage
}

export default Utils