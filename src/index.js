import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import VideoSearch from 'youtube-api-search';
import SearchBar from './../src/components/search_bar';
import VideoList from './../src/components/video_list';
import VideoDetail from './../src/components/video_detail';
import _ from "lodash";

const API_KEY = 'AIzaSyDoFWFl6lYBkIqtpv-0BiXleYBMFHubNLI';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            videos: [],
            selectedVideo: null
        };

        this.getVideos('Luke Skywalker');
    }

    getVideos(term) {
        VideoSearch({
            key: API_KEY,
            term: term
        }, (videos) => {
            this.setState({videos: videos, selectedVideo: videos[0]});
        });
    }

    render() {
        const getVideos = _.debounce(term => {
            this.getVideos(term);
        }, 300);

        return (
            <div>
                <SearchBar onSearchTermChange={getVideos}/>
                <VideoDetail video={this.state.selectedVideo}/>
                <VideoList
                    onVideoSelect={(selectedVideo) => {
                    this.setState({selectedVideo})
                }}
                    videos={this.state.videos}/>
            </div>
        );
    }

};

ReactDOM.render(
    <App/>, document.querySelector('.container'));