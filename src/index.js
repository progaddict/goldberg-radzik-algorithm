import _ from 'lodash';

require('file?name=[name].[ext]!./index.html');

function component() {
    var element = document.createElement('div');

    /* lodash is required for the next line to work */
    element.innerHTML = _.map(['Hello', 'webpack'], function (item) {
        return item + ' ';
    });

    return element;
}

document.body.appendChild(component());
