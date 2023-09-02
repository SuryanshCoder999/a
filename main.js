song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scorel = 0;
song2 = "";
srw = 0;

function preload()
{
    song = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup() 
{
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function modelLoaded()
{
    console.log("PoseNet is initialized");
}

function draw() 
{
    image(video, 0, 0, 600, 500);
    fill("red");
    stroke("red");

    if(scorel > 0.2)
    {
    circle(leftWristX,leftWristY,20);
    song2.stop();
    song.play();
    }
    if(srw > 0.2)
    {
    circle(rightWristXWristX,rightWristY,20);
    song.stop();
    song2.play();
    }

}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function stop()
{
    song.stop();
}
function pause()
{
    song.pause();
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        srw = results[0].pose.keypoints[10].score;
        scorel = results[0].pose.keypoints[9].score;
        console.log("scorel = " + scorel);
        console.log("srw = " + srw);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX +"leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX +"rightWristY = " + rightWristY);
    }
}