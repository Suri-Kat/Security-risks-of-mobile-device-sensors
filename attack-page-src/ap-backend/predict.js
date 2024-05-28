class predict {
    modelEvaluation(payload){
        const { PythonShell } = require('python-shell');

        const modelPath = 'ai_model.pkl';
        
        return PythonShell.run('load_model.py', {args: [modelPath, JSON.stringify(payload)]}, function (err, result) {
            if (err) {
                console.error('Error occurred:', err);
              } else {
                console.log('Python script output:', result);
              }

        });
    }

}

module.exports = predict;