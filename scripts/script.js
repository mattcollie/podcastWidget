// https://feed.podcastmachine.com/podcasts/21337.json
// https://dev.opera.com/articles/html5-audio-radio-player/
// https://stackoverflow.com/questions/10792163/change-audio-src-with-javascript

function onBodyLoad() {
    console.log("DEBUG:: onBodyLoad");
    PodcastControl(document.getElementById('audioControl'));
}