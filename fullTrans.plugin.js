//META{"name":"fullTrans","displayName":"Full Transparency","website":"http://discord.gg/fjvwb95","source":""}*//

/*@cc_on
@if (@_jscript)
	var shell = WScript.CreateObject("WScript.Shell");
	var	fs = new ActiveXObject("Scripting.FileSystemObject");
	var	pathPlugins = shell.ExpandEnvironmentStrings("%APPDATA%\\BetterDiscord\\plugins");
	var	pathSelf = WScript.ScriptFullName;
	shell.Popup("Self installer started.", 0, "Full Transparency for BetterDiscord", 0x30);
	if (fs.GetParentFolderName(pathSelf) === fs.GetAbsolutePathName(pathPlugins)) {
		shell.Popup("No need to install me twice.", 0, "I'm already installed", 0x40);
	} else if (!fs.FolderExists(pathPlugins)) {
		shell.Popup("I can't find te BetterDiscord plugins folder.\nAre you sure it's installed?", 0, "Can't install myself", 0x10);
	} else if (shell.Popup("Should I copy myself to BetterDiscord's plugins folder for you?", 0, "Do you need some help?", 0x34) === 6) {
		fs.CopyFile(pathSelf, fs.BuildPath(pathPlugins, fs.GetFileName(pathSelf)), true);
		shell.Exec("explorer " + pathPlugins);
		shell.Popup("Yay! I'm installed! Enjoy :)", 0, "Successfully installed", 0x40);
	}
	WScript.Quit();

@else@*/

class fullTrans {

    getName() {
        return "Full Transparency";
    }
    getDescription() {
        return "QoL plugin for Full Transparency theme. Able to change backgrounds & transparency options easily. <br><br> *Must have BD 'Emote Menu' turned on for this plugin to work.*";
    }
    getVersion() {
        return "1.1";
    }
    getAuthor() {
        return "Satoru";
    }

    start() {
        if (!global.ZeresPluginLibrary) return window.BdApi.alert("Library Missing", `The library plugin needed for ${this.getName()} is missing.<br /><br /> <a href="https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js" target="_blank">Click here to download the library!</a>`);
        ZLibrary.PluginUpdater.checkForUpdate(this.getName(), this.getVersion(), "LINK_TO_RAW_CODE");
        BdApi.injectCSS(this.getName(), this.css);
        console.log("[Full Transparency] has Started");
        this.favs = BdApi.loadData('fullTrans', 'favs') || [];


    }

    load() {

    }

    observer(e) {
        let a = $(e.addedNodes),
            r = $(e.removedNodes);
        if (a.is("#bda-qem") || a.find("#bda-qem").length > 0 || r.is(".bgBtn") || r.find(".bgBtn").length > 0) {
            this.insert();
        }


    }

    insert() {
        $(document).ready(function() {
            let $bgBtn = $('<button id="bgBtn" class="bgBtn" onclick="quickEmoteMenu.switchHandler(this); return false;"><span>Backgrounds</span></button>'),
                $bgModal = $('<div id="bgModal" class="bgModal" style="display:none"><div id="bgContent" class="bgContent"></div></div>'),
                $bgHead = $('<div id="bgHead" class="bgHead"><h2 class="bgTitle">Full Transparency</h2></div>'),
                $bgBody = $('<div id="bgBody" class="bgBody"><div class="input1"><input type="text" id="imgUrl" class="imgUrl" placeholder="https://ExampleURL.jpg" style="width:80%" autocomplete="on" /></div><div id="bgBtns" class="bgBtns"><button id="update" class="update"><span>Update</span></button><button id="reset" class="reset"><span>Reset</span></button></div></div>'),
                $bgSettings = $('<div id="setContent" class="setContent"><h3 class="sTitle">Main brightness</h3><div class="slide1"><input type="range" min="0" max="100" value="75" class="ftSlider" id="ftSlider"></div><h3 class="sTitle">Wallpaper brightness</h3><div class="slide2"><input type="range" min="0" max="100" value="0" class="opSlider" id="opSlider"></div></div>');

            $bgBtn.appendTo('#bda-qem');
            $bgModal.appendTo('.popout-3sVMXz');
            $bgHead.appendTo('#bgContent');
            $bgBody.appendTo('#bgContent');
            $bgSettings.appendTo('#bgContent');


            $(".emojiButton-3uL3Aw").on('click', function() {
                setTimeout(function() {
                    $("#bda-qem-twitch, #bda-qem-favourite,#bgBtn").removeClass("active");
                    $("#bda-qem-twitch-container, #bda-qem-favourite-container,#bgModal").hide();
                    $(".emojiPicker-3m1S-j").show();
                    $("#bda-qem-emojis").addClass("active");
                }, 1);
            });

            $("#bgBtn").on('click', function() {
                $("#bgModal").show();
                $(".bgBtn").addClass("active");
            });

            $('#ftSlider').on('input', function() {
                $('.appMount-3lHmkl').css('background-color', 'rgba(0,0,0,' + $(this).val() * '.01' + ')');
            });
			
            $('#opSlider').on('input', function() {
                $('.layer-3QrUeG,.titleBar-AC4pGV').css('background-color', 'rgba(0,0,0,' + $(this).val() * '.01' + ')');
            });


            $("#bda-qem-twitch, #bda-qem-favourite,#bda-qem-emojis").on('click', function() {
                $("#bgModal").hide();
                $(".bgBtn").removeClass("active");
            });

            $("#update").on('click', function() {
                let $rLink = $("#bgModal").find('#imgUrl').val();
                $("#app-mount").attr('style', 'background: url("' + $rLink + '")' + 'center/cover no-repeat !important');
                $(".app").attr('style', 'background: none !important');

            });

            $("#imgUrl").keyup(function(event) {
                if (event.keyCode === 13) {
                    $("#update").click();
                }
            });

            $("#reset").on('click', function() {
                $("#app-mount").removeAttr('style');
                $(".app,.layer-3QrUeG,.titleBar-AC4pGV,.appMount-3lHmkl").removeAttr('style');
                $("#imgUrl").val('');
                $("#ftSlider").val('75');
				$("#opSlider").val('0');
            });

            $("#recTab").on('click', function() {
                $("#setContainer").hide();
                $("#recContainer").show();
                $("#recTab").addClass("active");
                $("#setTab").removeClass("active");
            });

            $("#setTab").on('click', function() {
                $("#recContainer").hide();
                $("#setContainer").show();
                $("#setTab").addClass("active");
                $("#recTab").removeClass("active");
            });



        });


    }

    get css() {
        let c = `
		#bda-qem .bgBtn {background:rgba(0, 0, 0, 0.4);color: #00b7ff;border:none;box-shadow:none;order:1;cursor: pointer;border-radius: 5px 0 0 0}
		#bda-qem .bgBtn.active,#bda-qem .bgBtn:hover {background: rgba(0, 0, 0, 0.4);border-radius:5px 0 0 0}
		#bda-qem-twitch {border-radius:0}
		.bgModal, .bgContent {text-align: center;width: 346px;height: 327px;background:rgba(0, 0, 0, 0.4);color:#fff;border-radius: 0 0 5px 5px}
		.bgModal.active, .bgContent.active {display: block}
		.bgHead, .bgBody {padding: 5px}
		.bgHead {border-bottom:1px solid #00b7ff}
		.bgBody {margin-top:10px;padding-bottom:20px}
		.bgTitle {font-size: 1.2em;color:#00b7ff}
		.input1 {padding-top:10px;padding-bottom:10px}
		.imgUrl {color:#fff;padding:5px;margin:0 0 5px 0;border:none;background:transparent;box-shadow:0 0 5px 0 #00b7ff;border-radius:20px}
		#app-mount .imgUrl::-webkit-input-placeholder {color:#fff;text-align:center}
		.update, .reset {color:rgba(255, 255, 255, 0.8);font-size:.95rem;position:relative;width:60px;height:30px;font-weight:bold;border-radius: 10px }
		.update:active, .reset:active, .favBtn:active {transform: scale(.95)}
		.update {left: -11px; background: rgba(0, 255, 38, 0.2)}
		.reset {left: 11px;background: rgba(255, 0, 0, 0.2)}
		#app-mount .bgModal .bgContent ::-webkit-scrollbar {position:relative;margin-left:-4px;width:8px;background:transparent}
		#app-mount .bgModal .bgContent ::-webkit-scrollbar-track {background:rgba(47, 49, 54, .5);border-radius:10px}
		#app-mount .bgModal .bgContent ::-webkit-scrollbar-thumb {border-radius:10px;background:rgba(32, 34, 37, .9)}
		.opSlider,.ftSlider {
			-webkit-appearance: none;width: 99%;height: 10px;
			border-radius: 5px;background: #c9c9c9;
			outline: none;opacity: 0.4;transition: opacity .2s;
		}
		.opSlider:hover,.ftSlider:hover {opacity: .8}
		.opSlider::-webkit-slider-thumb,.ftSlider::-webkit-slider-thumb {
			-webkit-appearance: none;appearance: none;
			width: 20px;height: 20px;border-radius: 50%; 
			background: #66ff7c;cursor: pointer;
		}
		.sTitle{padding-top:15px}
		.typeWindows-1za-n7 {height: 22px;margin-top: 0}
		.winButton-iRh8-Z {top:0}
		.popout-3sVMXz {z-index:1000 !important}
		
		`;
        return c;
    }

    getSettingsPanel() {
        let div = document.createElement('div'),
            title = document.createElement('h4'),
            favs = document.createElement('textarea'),
            br = document.createElement('br'),
            save = document.createElement('button');
        save.innerText = 'Save';
        save.style.backgroundColor = '#7289da';
        save.style.color = '#fff';
        save.style.fontSize = '100%';
        title.innerText = 'Favorites';
        title.style.textAlign = 'center';
        favs.placeholder = 'Add links here to make a list of favorites. (Comma separated, multi-line allowed. Example  "One, Two, Three").';
        favs.value = this.favs.join(', ');
        favs.style.width = '100%';
        favs.style.minHeight = '15ch';
        save.addEventListener('click', _ => {
            this.favs = favs.value.split(',').map(e => e.trim());
            BdApi.saveData('fullTrans', 'favs', this.favs);
            BdApi.showToast('Favorites Saved!', {
                type: 'success'
            })
        });
        div.appendChild(title);
        div.appendChild(favs);
        div.appendChild(br);
        div.appendChild(save);
        return div;



    }

    stop() {
        $("#bgModal, #bgBtn").remove();
        $(".app,.layer-3QrUeG,.titleBar-AC4pGV,.appMount-3lHmkl").removeAttr('style');
        BdApi.clearCSS(this.getName());
        console.log("[Full Transparency] has Stopped");
    }

    unload() {
        this.stop();
        observer.disconnect();
    }

}

/*@end@*/