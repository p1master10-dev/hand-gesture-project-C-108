Webcam.set({
    width: 350,
    height: 300,
    image_format: 'jpeg',
    jpeg_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach(' #camera ');

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("image").innerHTML = '<img id="captured_image" src="' + data_uri + '"/>';
    });
}

console.log('ml5 version:' , ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/tapZHyITe/model.json' , modelLoaded);

function modelLoaded(){
    console.log('Model Loaded !');
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data1 = "";
    if(document.getElementById("predictionToText").innerHTML == "Amazing"){
        speak_data1 = "This Is So " + prediction;
    }
    if(document.getElementById("predictionToText").innerHTML == "Best"){
        speak_data1 = "This Will Be The " + prediction + " App";
    } 
    if(document.getElementById("predictionToText").innerHTML == "Cheese"){
        speak_data1 = "Be Smiling , " + prediction;
    } 
    var utterThis = new SpeechSynthesisUtterance(speak_data1);
    synth.speak(utterThis);
}

function predictionCheck(){
    img = document.getElementById("captured_image");
    classifier.classify(img , gotResult);
}

function gotResult(error , results){
    if(error){
        console.error(error);
    }else{
        console.log(results);
        document.getElementById("predictionToText").innerHTML = results[0].label;
        prediction = results[0].label;
        speak();
        if(results[0].label == "Amazing"){
            document.getElementById("predictionToEmoji").innerHTML = "&#128076;";
        }
        if(results[0].label == "Best"){
            document.getElementById("predictionToEmoji").innerHTML = "&#128077;";
        }
        if(results[0].label == "Cheese"){
            document.getElementById("predictionToEmoji").innerHTML = "&#9996;";
        }
    }
}