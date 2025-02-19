import React, { Component, createContext } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Entypo } from "@expo/vector-icons";
import MusicInfo from 'expo-music-info-2';
import * as FileSystem from 'expo-file-system';
import { StorageAccessFramework } from 'expo-file-system';
import { Audio } from 'expo-av';

import * as MediaLibrary from "expo-media-library";

export const AudioContext = createContext();

export class AudioProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            audioFiles: [],
            data: [],
            tracks: [],
            albums: [],
            artists: [],
            genres: [],
            playlists: [],
            isLoaded: false,
            audioData: null,
            audioObject: null,
            duration: null,
            position: null,
            activePlayList: [],
            currentAudio: null,
            currentAudioIndex: null,
            playbackPosition: null,
            playbackDuration: null,
        }
    }

    convertTimeDuration = (data) => {
        let minutes = Math.floor(data / 60)
        let seconds = parseInt(data - (minutes * 60))

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        this.updateState(this, {duration: minutes + ":" + seconds})
        // this.setState({...this.state, duration: duration, position: position})
    }

    convertTimePosition = (data) => {
        let minutes = Math.floor(data / 60)
        let seconds = parseInt(data - (minutes * 60))

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        this.updateState(this, {position: minutes + ":" + seconds})
        // this.setState({...this.state, duration: duration, position: position})
    }

    setDuration = async (data) => {
        if (data.isLoaded && data.isPlaying) {
            this.updateState(this, {
                playbackPosition: data.positionMillis,
                playbackDuration: data.durationMillis,
                currentAudio: data
            });

            // console.log(this.state.playbackPosition);
            // console.log(data)
        }
    };

    playAudio = async (uri, data) => {
        if (this.state.currentAudio === null) {
            const audio = new Audio.Sound();
            await audio.loadAsync(uri, {progressUpdateIntervalMillis: 1000})
            const currentAudio = await audio.playAsync()

            this.setState({...this.state, audioData: data, audioObject: audio, currentAudio: currentAudio})
            // console.log(currentAudio.durationMillis / 1000, data.assets.duration)
            // await this.convertTime(data.assets.duration)
        }

        // if (this.state.currentAudio && this.state.currentAudio.sound.uri === uri && JSON.stringify(data) === JSON.stringify(this.state.audioData)) {
        //     return;
        // }

        if ((this.state.currentAudio && JSON.stringify(data) != JSON.stringify(this.state.audioData))) {
            await this.state.audioObject.stopAsync();
            await this.state.audioObject.unloadAsync();
            const currentAudio = await this.state.audioObject.loadAsync(uri, { shouldPlay: true, progressUpdateIntervalMillis: 1000});
            // const duration = await currentAudio.getStatusAsync().then((status) => status.durationMillis);

            this.setState({...this.state, audioData: data, currentAudio: currentAudio})

            // await this.convertTime(duration);
        }

        // this.state.audioObject.setProgressUpdateIntervalAsync(100);
        // this.state.audioObject.setOnPlaybackStatusUpdate(this.setDuration)
    }

    pauseAudio = async () => {
        const currentAudio = await this.state.audioObject.pauseAsync();
        this.updateState(this, {currentAudio: currentAudio})
    }

    resumeAudio = async () => {
        const currentAudio = await this.state.audioObject.playAsync();
        this.updateState(this, {currentAudio: currentAudio})
    }

    stopAudio = async (uri, option, data) => {
        const audio = Audio.Sound();
        const currentAudio = await audio.loadAsync(uri, option)
    }

    nextAudio = async (uri, option, data) => {
        const audio = new Audio.Sound();
        const currentAudio = await audio.loadAsync(uri, option)

        currentAudio.
        this.setState({...this.state, audioData: data, audioObject: currentAudio})
        console.log(data)
    }

    previousAudio = async (uri, option, data) => {
        const audio = new Audio.Sound();
        const currentAudio = await audio.loadAsync(uri, option)

        currentAudio.
        this.setState({...this.state, audioData: data, audioObject: currentAudio})
        console.log(data)
    }

    permissionAlert = () => {
        Alert.alert("Permission Required", "This app needs to read audio files!", [{
            text: "Ok",
            onPress: () => this.getPermission()
        },{
            text: "Cancel",
            onPress: () => this.permissionAlert()
        }])
    };

    getAudioFiles = async () => {
        let media = await MediaLibrary.getAssetsAsync({
            mediaType: "audio"
        })
        media = await MediaLibrary.getAssetsAsync({
            mediaType: "audio",
            first: media.totalCount
        })

        // Create folder if not exists
        const dirInfo = await FileSystem.getInfoAsync(FileSystem.cacheDirectory + 'MuzikalPlayer/');
        if (!dirInfo.exists) {
            console.log("Directory does not exist, creating...");
            await FileSystem.makeDirectoryAsync(FileSystem.cacheDirectory + 'MuzikalPlayer/', {
                intermediates: true
            });
            await FileSystem.makeDirectoryAsync(FileSystem.cacheDirectory + 'MuzikalPlayer/Data/', {
                intermediates: true
            }).then(async () => {
                await FileSystem.writeAsStringAsync("file:///data/user/0/host.exp.exponent/cache/MuzikalPlayer/Data/original.json", JSON.stringify({hello: "world"}), {
                encoding: FileSystem.EncodingType.UTF8
                })

                await FileSystem.writeAsStringAsync("file:///data/user/0/host.exp.exponent/cache/MuzikalPlayer/Data/data.json", JSON.stringify({hello: "world"}), {
                encoding: FileSystem.EncodingType.UTF8
                })

                await FileSystem.writeAsStringAsync("file:///data/user/0/host.exp.exponent/cache/MuzikalPlayer/Data/playlists.json", JSON.stringify([]), {
                encoding: FileSystem.EncodingType.UTF8
                })
            }).catch((err) => {
                // Handle errors
                console.log(err)
            });
        }

        let readData = await FileSystem.readAsStringAsync("file:///data/user/0/host.exp.exponent/cache/MuzikalPlayer/Data/original.json", {
            encoding: FileSystem.EncodingType.UTF8
        })

        let metadata = JSON.parse(await FileSystem.readAsStringAsync("file:///data/user/0/host.exp.exponent/cache/MuzikalPlayer/Data/data.json", {
            encoding: FileSystem.EncodingType.UTF8
        }))

        let playlists = JSON.parse(await FileSystem.readAsStringAsync("file:///data/user/0/host.exp.exponent/cache/MuzikalPlayer/Data/playlists.json", {
            encoding: FileSystem.EncodingType.UTF8
        }))
   
        if (!metadata.hello) {
            await this.setStateData(metadata);
        }

        if (JSON.stringify(media.assets) != readData) {
            
            let data = (!metadata.hello) ? metadata : [];

            console.log(data)

            for (let i = 0; i < media.assets.length; i++) {
                if (media.assets[i].uri.search(".flac") != -1) {
                    continue
                }
                
                //check if the data is already in the metadata
                if (!metadata.hello && metadata.map(item => item.assets.id).includes(media.assets[i].id)) {
                    continue;
                }

                console.log(media.assets[i].uri)
                let results = await this.getAssetInfo(media.assets[i]);
                // console.log(results.album)
                if (results) {
                    
                    let imageLoc = "file:///storage/emulated/0/DCIM/" + media.assets[i].albumId + ".jpg"
                    let fileInfo = await FileSystem.getInfoAsync(imageLoc)

                    // let imageFile = res.metadata.picture ? "file:///storage/emulated/0/Data/Images/" + res.assets.albumId + ".jpg" : null;
                    if (!fileInfo.exists) {
                        albumid = media.assets[i].albumId
                        console.log("new album")
                        let imageFile = results.picture ? FileSystem.cacheDirectory + "MuzikalPlayer/" + albumid + ".jpg" : null;
                        console.log(imageFile);
                        if (imageFile) {
                            console.log(results.picture.pictureData.split("base64,")[0])
                            let result = await FileSystem.writeAsStringAsync(imageFile, results.picture.pictureData.split("base64,")[1], {
                                encoding: FileSystem.EncodingType.Base64
                            }).then(() => {
                                // File write is finished, do something here
                                console.log("Image Added")
                            })
                            .catch((err) => {
                                // Handle errors
                                console.log(err)
                            });;

                            console.log(result);

                            let mediaRes;
                            
                            if (imageFile) {
                                mediaRes = await MediaLibrary.saveToLibraryAsync(imageFile);
                            }
                            // let mediaRes = await MediaLibrary.saveToLibraryAsync("file:///storage/emulated/0/DCIM/" + res.assets.albumId + ".jpg");
                            // console.log(mediaRes);

                        } else {
                            imageLoc = "https://a.ppy.sh/2103927"; // if none

                            // find the cover from the album folder
                            coverList = ["cover.jpg", "cover.png", "cover.jpeg", "Cover.jpg", "Cover.png", "Cover.jpeg", "COVER.jpg", "COVER.png", "COVER.jpeg"]
                            coverUri = media.assets[i].uri.slice(0, media.assets[i].uri.lastIndexOf("/"));
                            for (file in coverList) {
                                let isCover = await FileSystem.getInfoAsync(coverUri + "/" + coverList[file])
                                if (isCover.exists) {
                                    imageLoc = coverUri + "/" + coverList[file]
                                    console.log("found cover")
                                    break;
                                }
                            }
                        }
                    }

                    let res = {
                        metadata: {
                            album: results.album,
                            title: results.title,
                            artist: results.artist,
                            genre: results.genre,
                            image: imageLoc
                        },
                        assets: media.assets[i],
                        dateAdded: Date.now()
                    }
                    
                    data.push(
                        res
                    )
                    // console.log(res)
                }
                else {
                    console.log(results)
                }

            }

            await FileSystem.writeAsStringAsync("file:///data/user/0/host.exp.exponent/cache/MuzikalPlayer/Data/data.json", JSON.stringify(data), {
                encoding: FileSystem.EncodingType.UTF8
            }).then(() => {
                // File write is finished, do something here
                console.log("Data is written!")
            })
            .catch((err) => {
                // Handle errors
                console.log(err)
            });

            await FileSystem.writeAsStringAsync("file:///data/user/0/host.exp.exponent/cache/MuzikalPlayer/Data/original.json", JSON.stringify(media.assets), {
                encoding: FileSystem.EncodingType.UTF8
            }).then(() => {
                // File write is finished, do something here
                console.log("Data is written!")
            })
            .catch((err) => {
                // Handle errors
                console.log(err)
            });

            metadata = data;
        }

        // re-render the screen
        await this.setStateData(metadata, playlists);

    }

    newPlaylist = async (data) => {
        let newPlaylist = this.state.playlists
        newPlaylist.push(
            {
                id: Date.now(),
                name: data,
                tracks: []
            }
        )

        await FileSystem.writeAsStringAsync("file:///data/user/0/host.exp.exponent/cache/MuzikalPlayer/Data/playlists.json", JSON.stringify(newPlaylist), {
                encoding: FileSystem.EncodingType.UTF8
            }).then(() => {
                // File write is finished, do something here
                console.log("Data is written!")
            })
            .catch((err) => {
                // Handle errors
                console.log(err)
            });

        return newPlaylist;
    }

    updatePlaylist = async (data) => {
        // this.state.playlists.map(item => {
        //     if (item.id == data.id) {
                
        //     }
        // })
        for (playlist in this.state.playlists) {
            if (data.id == this.state.playlists[playlist].id) {
                this.state.playlists[playlist].name = data.name;
                break;
            }
        }

        await FileSystem.writeAsStringAsync("file:///data/user/0/host.exp.exponent/cache/MuzikalPlayer/Data/playlists.json", JSON.stringify(this.state.playlists), {
                encoding: FileSystem.EncodingType.UTF8
            }).then(() => {
                // File write is finished, do something here
                console.log("Data is updated!")
            })
            .catch((err) => {
                // Handle errors
                console.log(err)
            });

        return this.state.playlists;
    }

    deletePlaylist = async (data) => {
        let newPlaylist = this.state.playlists.filter(item => item.id != data);
        this.setState({...this.state, playlists: newPlaylist})
        // console.log(this.state.playlists)
        await FileSystem.writeAsStringAsync("file:///data/user/0/host.exp.exponent/cache/MuzikalPlayer/Data/playlists.json", JSON.stringify(newPlaylist), {
                encoding: FileSystem.EncodingType.UTF8
            }).then(() => {
                // File write is finished, do something here
                console.log("Data "+ data +" is updated!")
            })
            .catch((err) => {
                // Handle errors
                console.log(err)
            });

        return newPlaylist;
    }

    addTrackPlaylist = async (data) => {
        for (playlist in this.state.playlists) {
            if (this.state.playlists[playlist].id == data.id) {
                // if (!this.state.playlists[playlist].tracks.includes(data.trackId)) {
                //     this.state.playlists[playlist].tracks.push(data.trackId)
                // }
                data.tracks.map(id => {
                    if (!this.state.playlists[playlist].tracks.includes(id)) {
                        this.state.playlists[playlist].tracks.push(id);
                    }
                })
                break;
            }
        }

        await FileSystem.writeAsStringAsync("file:///data/user/0/host.exp.exponent/cache/MuzikalPlayer/Data/playlists.json", JSON.stringify(this.state.playlists), {
                encoding: FileSystem.EncodingType.UTF8
            }).then(() => {
                // File write is finished, do something here
                console.log("Data is updated!")
            })
            .catch((err) => {
                // Handle errors
                console.log(err)
            });

        this.setState({...this.state, playlists: this.state.playlists})

    }

    removeTrackPlaylist = async (data) => {
        for (playlist in this.state.playlists) {
            if (this.state.playlists[playlist].id == data.id) {
                this.state.playlists[playlist].tracks = this.state.playlists[playlist].tracks.filter(id => id != data.tracks[0]);
                break;
            }
        }

        await FileSystem.writeAsStringAsync("file:///data/user/0/host.exp.exponent/cache/MuzikalPlayer/Data/playlists.json", JSON.stringify(this.state.playlists), {
                encoding: FileSystem.EncodingType.UTF8
            }).then(() => {
                // File write is finished, do something here
                console.log("Data is updated!")
            })
            .catch((err) => {
                // Handle errors
                console.log(err)
            });

        this.setState({...this.state, playlists: this.state.playlists})

    }

    setStateData = async (metadata, playlists) => {
        // get album list
        let albumData = metadata.map(item => {
            return {
                album: item.metadata.album,
                tracks: [],
                related: [],
                artists: [],
                images: []

            }
        });
        let jsonObject = albumData.map(JSON.stringify);
        let uniqueSet = new Set(jsonObject);
        let albumRes = Array.from(uniqueSet).map(JSON.parse);

        // get related folders from a certain album
        // let albums = albumRes.map()

        //get artist
        let artistData = metadata.map(item => {
            return {
                name: item.metadata.artist,
                albums: [],
                tracks: []
            }
        });
        let jsonObject1 = artistData.map(JSON.stringify);
        let uniqueSet1 = new Set(jsonObject1);
        let artistRes = Array.from(uniqueSet1).map(JSON.parse);

        let genreData = metadata.map(item => {
            return {
                name: item.metadata.genre ? item.metadata.genre : "<unknown>",
                tracks: [],
                images: []
            }
        })
        let jsonObject2 = genreData.map(JSON.stringify);
        let uniqueSet2 = new Set(jsonObject2);
        let genreRes = Array.from(uniqueSet2).map(JSON.parse);

        // get related images, artists, related albums and tracks from album
        for (album in albumRes) {
            // merge related albums
            let albumr = metadata.map(item => {
                return {
                    id: item.assets.albumId,
                    album: item.metadata.album,
                    image: item.metadata.image
                }
            })
            let jsonObject1 = albumr.map(JSON.stringify);
            let uniqueSet1 = new Set(jsonObject1);
            let albumrRes = Array.from(uniqueSet1).map(JSON.parse);
            albumrRes.map(item => {
                if (item.album == albumRes[album].album) {
                    albumRes[album].related.push(item.id)
                    albumRes[album].images.push(item.image)
                }
            })

            // tracks
            metadata.map(item => {
                if (item.metadata.album == albumRes[album].album) {
                    albumRes[album].tracks.push(item.assets.id)
                }
            })

            // artists
            let albumArtists = metadata.map(item => {
                return {
                    artist: item.metadata.artist,
                    album: item.metadata.album
                }
            })
            let jsonObject = albumArtists.map(JSON.stringify);
            let uniqueSet = new Set(jsonObject);
            let albumArtistsRes = Array.from(uniqueSet).map(JSON.parse);
            albumArtistsRes.map(item => {
                if (item.album == albumRes[album].album) {
                    albumRes[album].artists.push(item.artist)
                }
            })
        }

        // get related tracks and albums from artist
        for (artist in artistRes) {
            // console.log(artistRes[artist].name)

            // tracks
            metadata.map(item => {
                if (item.metadata.artist == artistRes[artist].name) {
                    artistRes[artist].tracks.push(item.assets.id)
                }
            })

            // albums
            albumRes.map(item => {
                if (item.artists.includes(artistRes[artist].name)) {
                    artistRes[artist].albums.push({
                        album: item.album,
                        image: item.images[0]
                    })
                }
            })
        }

        for (genre in genreRes) {
            // tracks
            metadata.map(item => {
                let genreName = item.metadata.genre ? item.metadata.genre : "<unknown>"
                if (genreName == genreRes[genre].name) {
                    genreRes[genre].tracks.push(item.assets.id)
                    genreRes[genre].images.push(item.metadata.image)
                }
            })
        }
        
        this.setState({...this.state, tracks: metadata, albums: albumRes, artists: artistRes, genres: genreRes, playlists: playlists, isLoaded: true})
    }

    getAssetInfo = async (item) => {
        let data = await MusicInfo.getMusicInfoAsync(item.uri, {genre: true, picture: true});
        return data;

    }

    getPermission = async () => {
        // {"accessPrivileges": "none", "canAskAgain": true, "expires": "never", "granted": false, "status": "undetermined"}
        const permission = await MediaLibrary.getPermissionsAsync()
        // console.log(permission)
        if (permission.granted) {
            this.getAudioFiles()
        }

        if (!permission.granted && permission.canAskAgain) {
            const {status, canAskAgain} = await MediaLibrary.requestPermissionsAsync();

            if (status === 'denied' && canAskAgain) {
                this.getPermission()
            }

            if (status === 'granted') {
                this.getAudioFiles()
            }

            if (status === 'denied' && !canAskAgain) {
                // test test error
            }
        }
    }

    getStoragePermission = async () =>{
        
        const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync("file:///storage/emulated/0/Data");
        if (permissions.granted) {
        // You can now access the storage.
        const uri = permissions.directoryUri;
        console.log(uri)

        const files = await StorageAccessFramework.readDirectoryAsync(uri);
        alert(`Files inside ${uri}:\n\n${JSON.stringify(files)}`);
        // Perform your file operations here.
        } else {
        // Handle the case where permissions were not granted.
        }
    }

    componentDidMount () {
        // this.getStoragePermission()
        this.getPermission()
    }

    getMusicData = async (uri) => {
        return await MusicInfo.getMusicInfoAsync((uri, {genre: true, picture: false}))
    }

    updateState = (prevState, newState = {}) => {
        this.setState({ ...prevState, ...newState });
      };

    render() {
        return <AudioContext.Provider value={{
            tracks: this.state.tracks,
            albums: this.state.albums,
            artists: this.state.artists,
            genres: this.state.genres,
            playlists: this.state.playlists,
            newPlaylist: this.newPlaylist,
            updatePlaylist: this.updatePlaylist,
            deletePlaylist: this.deletePlaylist,
            addTrackPlaylist: this.addTrackPlaylist,
            removeTrackPlaylist: this.removeTrackPlaylist,
            isLoaded: this.state.isLoaded,
            audioData: this.state.audioData,
            audioObject: this.state.audioObject,
            activePlayList: this.state.activePlayList,
            currentAudio: this.state.currentAudio,
            currentAudioIndex: this.state.currentAudioIndex,
            playbackPosition: this.state.playbackPosition,
            playbackDuration: this.state.playbackDuration,
            duration: this.state.duration,
            position: this.state.position,
            convertTime: this.convertTime,
            playAudio: this.playAudio,
            pauseAudio: this.pauseAudio,
            resumeAudio: this.resumeAudio,
            stopAudio: this.stopAudio,}}>
                {this.props.children}
            </AudioContext.Provider>
    }
}

export default AudioProvider;