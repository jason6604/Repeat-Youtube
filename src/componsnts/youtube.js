import React, {useState, useEffect} from 'react';
import YouTube from 'react-youtube';
import '../style/youtube.css'

const Youtube = () => {
    const [youtubeId, setYoutubeId] = useState('');
    const youtubeOpts = {
      height: '390',
      width: '640',
      playerVars: {
        autoplay: 1,
      },
    }        

    const onClick = () => {
        const yturl = document.getElementById('input-yturl').value;
        if (checkValidUrl(yturl)) {
            const targetUrl = new URL(yturl);
            const queryString = targetUrl.search;
            const urlParams = new URLSearchParams(queryString);
            
            if (urlParams.has("v")){
                setYoutubeId(urlParams.get('v'));
                console.log("video Id: " + urlParams.get('v'));
            }else if (urlParams.has("si")) {
                setYoutubeId(targetUrl.pathname.replace("/", "")); 
                console.log("video Id: " + targetUrl.pathname.replace("/", ""));               
            };
        }
    }

    const checkValidUrl = (url) => {
        try {
            new URL(url);
            if (url.includes("youtu")) return true
            return false;
        } catch(e) {
            return false;
        }
    }


    const onReady = (event) => {
        // access to player in all event handlers via event.target
        console.log("Player is Ready!!")
        event.target.pauseVideo();
      }
    
    const onStateChange = (event) => {
        if (event && event.data === 0) {
            event.target.playVideo();
        }
    }

    useEffect(()=>{
        const input = document.getElementById("input-yturl");

        input.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById("search-btn").click();
        }
        }); 
    },[]);

    return (
        <div className="youtube-container" >
            <h3>YouTube Replay Tool</h3>
            <div className="searcharea">
                <input className="input-url" id="input-yturl" placeholder="Please enter youtube url"/>
                <button className='search-button' id="search-btn" onClick={onClick}>Search</button>
            </div>            
            <YouTube 
                videoId={youtubeId} 
                opts={youtubeOpts} 
                onReady={onReady} 
                onStateChange={onStateChange}
            />
        </div>
    );
};

export default Youtube;