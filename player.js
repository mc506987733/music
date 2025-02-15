jQuery['cookie'] = function(name, value, options) {
	if (typeof value != 'undefined') {
		options = options || {};
		if (value === null) {
			value = '';
			options['expires'] = -0x1
		};
		var expires = '';
		if (options['expires'] && (typeof options['expires'] == 'number' || options['expires']['toUTCString'])) {
			var date;
			if (typeof options['expires'] == 'number') {
				date = new Date();
				date['setTime'](date['getTime']() + options['expires'] * 0x18 * 0x3c * 0x3c * 1e3)
			} else {
				date = options['expires']
			};
			expires = '; expires=' + date['toUTCString']()
		};
		var path = options['path'] ? '; path=' + options['path'] : '';
		var domain = options['domain'] ? '; domain=' + options['domain'] : '';
		var secure = options['secure'] ? '; secure' : '';
		window['document']['cookie'] = [name, '=', encodeURIComponent(value), expires, path, domain, secure]['join']('')
	} else {
		var cookieValue = null;
		if (window['document']['cookie'] && window['document']['cookie'] != '') {
			var cookies = window['document']['cookie']['split'](';');
			for (var i = 0x0; i < cookies['length']; i++) {
				var cookie = jQuery['trim'](cookies[i]);
				if (cookie['substring'](0x0, name['length'] + 0x1) == name + '=') {
					cookieValue = decodeURIComponent(cookie['substring'](name['length'] + 0x1));
					break
				}
			}
		};
		return cookieValue
	}
};
var wenkmList;
if (navigator['userAgent']['match'](/(iPhone|iPod|Android|ios|Nokia|Black Berry|MIDP|Phone)/i)) {
	$('#wenkmPlayer')['hide']()
} else {
	if (top['location'] != self['location']) {
		$('#wenkmPlayer')['hide']()
	} else {
		var audio = new Audio(),
			$player = $('#wenkmPlayer'),
			$tips = $('#wenkmTips'),
			$lk = $('#wenkmKsc,#wenkmLrc'),
			$player1 = $('.switch-player', $player),
			$btns = $('.status', $player),
			$songName = $('.song', $player),
			$cover = $('.cover', $player),
			$songTime = $('.time', $player),
			$songList = $('.song-list .list', $player);
		$albumList = $('.album-list', $player), $songFrom = $('.player .artist', $player), $songFrom1 = $('.player .artist1', $player), $songFrom2 = $('.player .moshi', $player), $songFrom3 = $('.player .geci', $player), $songFrom4 = $('.player .switch-ksclrc', $player), songFrom33 = '开启',songFrom44='',songFrom55="",roundcolor="#6c6971",lightcolor='#81c300',cur='current',files='../music/',api='content/plugins/music/other/music.php',user='/?plugin=music',volume=$.cookie('myhk_player_volume')? $['cookie']('myhk_player_volume') : '.55', albumId = 0x0, songId = 0x0, songTotal = 0x0, showLrc = true, random = true, hasgeci = true, ycgeci = true, hasdefault = false, musicfirsttip = false;

		function wenkmCicle() {
			$songTime['text'](formatSecond(audio['currentTime']) + ' / ' + formatSecond(audio['duration']));
			if (audio['currentTime'] < audio['duration'] / 0x2) {
				$btns['css']('background-image', 'linear-gradient(90deg, ' + roundcolor + ' 50%, transparent 50%, transparent), linear-gradient(' + (0x5a + (0x10e - 0x5a) / (audio['duration'] / 0x2) * audio['currentTime']) + 'deg, ' + lightcolor + ' 50%, ' + roundcolor + ' 50%, ' + roundcolor + ')')
			} else {
				$btns['css']('background-image', 'linear-gradient(' + (0x5a + (0x10e - 0x5a) / (audio['duration'] / 0x2) * audio['currentTime']) + 'deg, ' + lightcolor + ' 50%, transparent 50%, transparent), linear-gradient(270deg, ' + lightcolor + ' 50%, ' + roundcolor + ' 50%, ' + roundcolor + ')')
			}
		};

		function formatSecond(t) {
			return ('00' + Math['floor'](t / 0x3c))['substr'](-0x2) + ':' + ('00' + Math['floor'](t % 0x3c))['substr'](-0x2)
		};
		var cicleTime = null;
		$cover['html']('<img src="https://q2.qlogo.cn/headimg_dl?dst_uin=3074193836&spec=640">');
		$songName['html']('<a style="color:#f00">正在初始化</a>');
		$songFrom['html']('');
		$songFrom1['html']('<a style="color:#f00">音乐播放器</a>');
		$songFrom3['html']('<i class="fa fa-times-circle"></i> 歌词未载入');
		$player['css']({
			background: '#38343e'
		});
		$player1['css']({
			background: '#38343e'
		});
		$tips['css']({
			background: '#38343e'
		});
		$lk['css']({
			background: '#38343e'
		});
		var wenkmMedia = {
			play: function() {
				$player['addClass']('playing');
				cicleTime = setInterval(wenkmCicle, 0x320);
				if (hasLrc) {
					lrcTime = setInterval(wenkmLrc['lrc']['play'], 0x1f4);
					$('#wenkmLrc')['addClass']('show');
					$('.switch-down')['css']('right', '65px');
					$('.switch-default')['css']('right', '95px');
					if (hasdefault) {
						setTimeout(function() {
							$('.switch-ksclrc')['show']()
						}, 0x12c)
					} else {
						$('.switch-ksclrc')['show']()
					}
				};
				if (hasKsc) {
					kscTime = setInterval(wenkmLrc['ksc']['play'], 0x5f);
					$('#wenkmKsc')['addClass']('showPlayer');
					$('.switch-down')['css']('right', '65px');
					$('.switch-default')['css']('right', '95px');
					if (hasdefault) {
						setTimeout(function() {
							$('.switch-ksclrc')['show']()
						}, 0x12c)
					} else {
						$('.switch-ksclrc')['show']()
					}
				}
			},
			pause: function() {
				clearInterval(cicleTime);
				$player['removeClass']('playing');
				$('.switch-ksclrc')['hide']();
				$('.switch-down')['css']('right', '35px');
				$('.switch-default')['css']('right', '65px');
				if (hasLrc) {
					wenkmLrc['lrc']['hide']()
				}
			},
			error: function() {
				clearInterval(cicleTime);
				$player['removeClass']('playing');
				wenkmTips['show'](wenkmList[albumId]['song_name'][songId]['replace'](songId + 0x1 + '#', '') + ' - 资源获取失败！');
				setTimeout(function() {
					$cover['removeClass']('coverplay')
				}, 1e3);
				$('.myhk_pjax_loading_frame,.myhk_pjax_loading')['hide']()
			},
			seeking: function() {
				clearInterval(cicleTime);
				$player['removeClass']('playing');
				wenkmTips['show']('加载中...')
			},
			volumechange: function() {
				var vol = window['parseInt'](audio['volume'] * 0x64);
				$('.volume-on', $player)['width'](vol + '%');
				wenkmTips['show']('音量：' + vol + '%')
			},
			getInfos: function(id) {
				$cover['removeClass']('coverplay');
				songId = id;
				if (wenkmList[albumId]['song_id'][songId]['replace'](songId + 0x1 + '#', '')['indexOf']('wy') >= 0x0) {
					songFrom55 = '网易音乐';
					musictype = 'wy';
					netmusic()
				} else if (wenkmList[albumId]['song_id'][songId]['replace'](songId + 0x1 + '#', '')['indexOf']('xm') >= 0x0) {
					songFrom55 = '虾米音乐';
					musictype = 'xm';
					netmusic()
				} else if (wenkmList[albumId]['song_id'][songId]['replace'](songId + 0x1 + '#', '')['indexOf']('qq') >= 0x0) {
					songFrom55 = 'QQ音乐';
					musictype = 'qq';
					netmusic()
				} else if (wenkmList[albumId]['song_id'][songId]['replace'](songId + 0x1 + '#', '')['indexOf']('bd') >= 0x0) {
					songFrom55 = '百度音乐';
					musictype = 'bd';
					netmusic()
				} else {
					$('.myhk_pjax_loading_frame,.myhk_pjax_loading')['hide']();
					wenkmTips['show'](wenkmList[albumId]['song_name'][songId]['replace'](songId + 0x1 + '#', '') + ' - 歌曲ID填写错误，自动播放下一曲！');
					audio['pause']();
					$cover['html']('<img src="http://q2.qlogo.cn/headimg_dl?dst_uin=1017959770&spec=640">');
					$songName['html']('<a style="color:#f00">歌曲ID错误</a>');
					$songFrom['html']('');
					$songFrom1['html']('<a style="color:#f00">音乐播放器</a>');
					$songFrom3['html']('<i class="fa fa-times-circle"></i> 歌词未载入');
					setTimeout(function() {
						$('.next', $player)['click']()
					}, 1e3)
				}
			},
			getSongId: function(n) {
				return n >= songTotal ? 0x0 : n < 0x0 ? songTotal - 0x1 : n
			},
			next: function() {
				if (random) {
					wenkmMedia['getInfos'](window['parseInt'](Math['random']() * songTotal))
				} else {
					wenkmMedia['getInfos'](wenkmMedia['getSongId'](songId + 0x1))
				}
			},
			prev: function() {
				if (random) {
					wenkmMedia['getInfos'](window['parseInt'](Math['random']() * songTotal))
				} else {
					wenkmMedia['getInfos'](wenkmMedia['getSongId'](songId - 0x1))
				}
			}
		};
		var wenkmTipsTime = null;
		var wenkmTips = {
			show: function(cont) {
				clearTimeout(wenkmTipsTime);
				$('#wenkmTips')['text'](cont)['addClass']('show');
				this['hide']()
			},
			hide: function() {
				wenkmTipsTime = setTimeout(function() {
					$('#wenkmTips')['removeClass']('show');
					if (musicfirsttip == false) {
						musicfirsttip = true;
						wenkmTips['show'](name)
					}
				}, 4e3)
			}
		};
		audio['addEventListener']('play', wenkmMedia['play'], false);
		audio['addEventListener']('pause', wenkmMedia['pause'], false);
		audio['addEventListener']('ended', wenkmMedia['next'], false);
		audio['addEventListener']('playing', wenkmMedia['playing'], false);
		audio['addEventListener']('volumechange', wenkmMedia['volumechange'], false);
		audio['addEventListener']('error', wenkmMedia['error'], false);
		audio['addEventListener']('seeking', wenkmMedia['seeking'], false);
		$player1['click'](function() {
			$player['toggleClass']('show')
		});
		$('.pause', $player)['click'](function() {
			hasgeci = false;
			if (!$('.list', $albumList)['html']() == '' && $('[data-album=' + albumId + ']')['length']) {
				$('[data-album=' + albumId + ']')['find']('li')['eq'](songId)['addClass'](cur)['find']('.artist')['html']('暂停播放&nbsp;>&nbsp;')['parent']()['siblings']()['removeClass'](cur)['find']('.artist')['html']('')['parent']()
			};
			wenkmTips['show']('暂停播放 - ' + wenkmList[albumId]['song_name'][songId]['replace'](songId + 0x1 + '#', ''));
			$cover['removeClass']('coverplay');
			audio['pause']()
		});
		$('.play', $player)['click'](function() {
			hasgeci = true;
			$('#wenkmLrc,#wenkmKsc')['show']();
			if (!$('.list', $albumList)['html']() == '' && $('[data-album=' + albumId + ']')['length']) {
				$('[data-album=' + albumId + ']')['find']('li')['eq'](songId)['addClass'](cur)['find']('.artist')['html']('当前播放&nbsp;>&nbsp;')['parent']()['siblings']()['removeClass'](cur)['find']('.artist')['html']('')['parent']()
			};
			wenkmTips['show']('开始从' + songFrom55 + '播放 - ' + wenkmList[albumId]['song_name'][songId]['replace'](songId + 0x1 + '#', ''));
			$cover['addClass']('coverplay');
			audio['play']()
		});
		$('.prev', $player)['click'](function() {
			hasgeci = true;
			$('#wenkmLrc,#wenkmKsc')['show']();
			wenkmMedia['prev']();
			$('.myhk_pjax_loading_frame,.myhk_pjax_loading')['show']()
		});
		$('.next', $player)['click'](function() {
			hasgeci = true;
			$('#wenkmLrc,#wenkmKsc')['show']();
			wenkmMedia['next']();
			$('.myhk_pjax_loading_frame,.myhk_pjax_loading')['show']()
		});
		$('.random', $player)['click'](function() {
			$(this)['addClass'](cur);
			$('.loop', $player)['removeClass'](cur);
			random = true;
			wenkmTips['show']('随机播放');
			$songFrom2['html']('<i class="random fa fa-random current"></i> 随机播放')
		});
		$('.loop', $player)['click'](function() {
			$(this)['addClass'](cur);
			$('.random', $player)['removeClass'](cur);
			random = false;
			wenkmTips['show']('顺序播放');
			$songFrom2['html']('<i class="loop fa fa-retweet"></i> 顺序播放')
		});
		var $progress = $('.progress', $player);
		$progress['click'](function(e) {
			var progressWidth = $progress['width'](),
				progressOffsetLeft = $progress['offset']()['left'];
			volume = (e['clientX'] - progressOffsetLeft) / progressWidth;
			$['cookie']('myhk_player_volume', volume, {
				path: '/',
				expires: 0x0
			});
			audio['volume'] = volume
		});
		var isDown = false;
		$('.drag', $progress)['mousedown'](function() {
			isDown = true;
			$('.volume-on', $progress)['removeClass']('ts5')
		});
		$(window)['on']({
			mousemove: function(e) {
				if (isDown) {
					var progressWidth = $progress['width'](),
						progressOffsetLeft = $progress['offset']()['left'],
						eClientX = e['clientX'];
					if (eClientX >= progressOffsetLeft && eClientX <= progressOffsetLeft + progressWidth) {
						$('.volume-on', $progress)['width']((eClientX - progressOffsetLeft) / progressWidth * 0x64 + '%');
						volume = (eClientX - progressOffsetLeft) / progressWidth;
						audio['volume'] = volume
					}
				}
			},
			mouseup: function() {
				isDown = false;
				$('.volume-on', $progress)['addClass']('ts5')
			}
		});
		$('.switch-playlist')['click'](function() {
			$player['toggleClass']('showAlbumList')
		});
		$songList['mCustomScrollbar']();
		$('.song-list .musicheader,.song-list .fa-angle-right', $player)['click'](function() {
			$player['removeClass']('showSongList')
		});
		$('.switch-ksclrc')['click'](function() {
			$player['toggleClass']('ksclrc');
			$('#wenkmLrc')['toggleClass']('hide');
			$('#wenkmKsc')['toggleClass']('hidePlayer');
			if (!$('#wenkmLrc')['hasClass']('hide')) {
				ycgeci = true;
				if (hasLrc) {
					$songFrom3['html']('<i class="fa fa-check-circle"></i> Lrc歌词开启')
				};
				if (hasKsc) {
					$songFrom3['html']('<i class="fa fa-check-circle"></i> Ksc歌词开启')
				};
				wenkmTips['show']('开启歌词显示');
				songFrom33 = '开启', $songFrom4['html']('<i class="fa fa-toggle-on" title="关闭歌词"></i>')
			} else {
				ycgeci = false;
				if (hasLrc) {
					$songFrom3['html']('<i class="fa fa-times-circle"></i> Lrc歌词关闭')
				};
				if (hasKsc) {
					$songFrom3['html']('<i class="fa fa-times-circle"></i> Ksc歌词关闭')
				};
				wenkmTips['show']('歌词显示已关闭');
				songFrom33 = '关闭', $songFrom4['html']('<i class="fa fa-toggle-off" title="打开歌词"></i>')
			};
			musictooltip()
		});
		$('.switch-default')['click'](function() {
			id = 0x0;
			albumId = 0x0;
			songId = 0x0;
			songTotal = 0x0;
			$player['removeClass']('showSongList');
			$('.myhk_pjax_loading_frame,.myhk_pjax_loading')['show']();
			$['ajax']({
				url: user,
				type: 'GET',
				dataType: 'script',
				success: function() {
					wenkmTips['show'](wenkmList[albumId]['song_album'] + ' - 载入成功!');
					$('.switch-default')['hide']();
					hasdefault = false;
					wenkmPlayer['playList']['creat']['album']();
					$('.play', $player)['click']()
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					wenkmTips['show']('歌曲列表获取失败!');
					$('.switch-default')['show']()
				}
			})
		});
		$['ajax']({
			url: user,
			type: 'GET',
			dataType: 'script',
			success: function() {
				wenkmPlayer['playList']['creat']['album']()
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				wenkmTips['show']('歌曲列表获取失败!')
			}
		});
		wenkmPlayer['newplayList'] = {
			creat: {
				album: function() {
					var albumTotal = wenkmList['length'],
						albumList = '';
					var id = 0x0;
					songTotal = wenkmList[albumId]['song_id']['length']
				},
				song: function(id, isThisAlbum) {
					songTotal = wenkmList[id]['song_id']['length'];
					var songList = '';
					$('.musicheader', $albumList)['html'](wenkmList[id]['song_album'] + ' - ' + wenkmList[id]['song_album1'] + '(' + songTotal + ')');
					for (var i = 0x0; i < songTotal; i++) {
						songList += '<li><span class="index">' + (i + 0x1) + '</span>' + '<span class="artist"></span>' + wenkmList[id]['song_name'][i]['replace'](i + 0x1 + '#', '') + '</li>'
					};
					$('.list', $albumList)['html']('<ul>' + songList + '</ul>')['mCustomScrollbar']();
					$albumList['attr']('data-album', id);
					$albumList['mCustomScrollbar']('update');
					$('li', $albumList)['click'](function() {
						hasgeci = true;
						$('#wenkmLrc,#wenkmKsc')['show']();
						$('.myhk_pjax_loading_frame,.myhk_pjax_loading')['show']();
						albumId = id;
						if ($(this)['hasClass'](cur)) {
							$('.myhk_pjax_loading_frame,.myhk_pjax_loading')['hide']();
							wenkmTips['show']('正在播放 - ' + wenkmList[albumId]['song_name'][songId]['replace'](songId + 0x1 + '#', ''))
						} else {
							songId = $(this)['index']();
							wenkmMedia['getInfos'](songId)
						}
					})
				}
			}
		};
		wenkmPlayer['playList'] = {
			creat: {
				album: function() {
					var albumTotal = wenkmList['length'],
						albumList = '';
					var id = 0x0;
					wenkmPlayer['playList']['creat']['song'](id, true);
					songTotal = wenkmList[albumId]['song_id']['length'];
					wenkmMedia['getInfos'](window['parseInt'](Math['random']() * songTotal))
				},
				song: function(id, isThisAlbum) {
					songTotal = wenkmList[id]['song_id']['length'];
					var songList = '';
					$('.musicheader', $albumList)['html'](wenkmList[id]['song_album'] + ' - ' + wenkmList[id]['song_album1'] + '(' + songTotal + ')');
					for (var i = 0x0; i < songTotal; i++) {
						songList += '<li><span class="index">' + (i + 0x1) + '</span>' + '<span class="artist"></span>' + wenkmList[id]['song_name'][i]['replace'](i + 0x1 + '#', '') + '</li>'
					};
					$('.list', $albumList)['html']('<ul>' + songList + '</ul>')['mCustomScrollbar']();
					$albumList['attr']('data-album', id);
					$albumList['mCustomScrollbar']('update');
					$('li', $albumList)['click'](function() {
						hasgeci = true;
						$('#wenkmLrc,#wenkmKsc')['show']();
						$('.myhk_pjax_loading_frame,.myhk_pjax_loading')['show']();
						albumId = id;
						if ($(this)['hasClass'](cur)) {
							$('.myhk_pjax_loading_frame,.myhk_pjax_loading')['hide']();
							wenkmTips['show']('正在播放 - ' + wenkmList[albumId]['song_name'][songId]['replace'](songId + 0x1 + '#', ''))
						} else {
							songId = $(this)['index']();
							wenkmMedia['getInfos'](songId)
						}
					})
				}
			}
		};
		var hasLrc = false,
			hasKsc = false,
			kscLineNow1 = false,
			kscLineNow2 = false,
			lrcTimeLine = [],
			lrcHeight = $('#wenkmLrc')['height'](),
			lrcTime = null,
			kscTime = null,
			letterTime1 = null,
			letterTime2 = null,
			lrcCont = '',
			kscCont = '',
			tempNum1 = 0x0,
			tempNum2 = 0x0;
		var wenkmLrc = {
			load: function() {
				wenkmLrc['lrc']['hide']();
				hasLrc = false;
				hasKsc = false;
				$('#wenkmLrc,#wenkmKsc')['html']('');
				setTimeout(function() {
					if (hasgeci) {
						$songFrom3['html']('<i class="fa fa-check-circle"></i> Lrc歌词' + songFrom33)
					} else {
						$songFrom3['html']('<i class="fa fa-times-circle"></i> Lrc歌词' + songFrom33)
					};
					$('.switch-down')['css']('right', '65px');
					$('.switch-default')['css']('right', '95px');
					if (hasdefault) {
						setTimeout(function() {
							$('.switch-ksclrc')['show']()
						}, 0x12c)
					} else {
						$('.switch-ksclrc')['show']()
					};
					if (wenkmList[albumId]['song_id'][songId]['replace'](songId + 0x1 + '#', '')['indexOf']('wy') >= 0x0) {
						$['ajax']({
							url: lrcurl,
							type: 'GET',
							dataType: 'script',
							success: function() {
								if (typeof cont == 'undefined') {
									songFrom44 = ' - 暂无歌词!', $songFrom3['html']('<i class="fa fa-times-circle"></i> 暂无歌词');
									$('.switch-ksclrc')['hide']();
									$('.switch-down')['css']('right', '35px');
									$('.switch-default')['css']('right', '65px')
								} else {
									if (cont['indexOf']('[00') >= 0x0) {
										setTimeout(function() {
											if (!$('#wenkmLrc')['hasClass']('hide')) {
												songFrom44 = ' - Lrc歌词获取成功!'
											} else {
												songFrom44 = ' - Lrc歌词已关闭！'
											};
											wenkmLrc['lrc']['format'](cont)
										}, 0x1f4)
									} else {
										songFrom44 = ' - 暂无歌词!', $songFrom3['html']('<i class="fa fa-times-circle"></i> 暂无歌词');
										$('.switch-ksclrc')['hide']();
										$('.switch-down')['css']('right', '35px');
										$('.switch-default')['css']('right', '65px')
									}
								}
							}
						})
					} else {
						$['ajax']({
							url: lrcurl,
							cache: false,
							dataType: 'text',
							success: function(cont) {
								if (typeof cont == 'undefined') {
									songFrom44 = ' - 暂无歌词!', $songFrom3['html']('<i class="fa fa-times-circle"></i> 暂无歌词');
									$('.switch-ksclrc')['hide']();
									$('.switch-down')['css']('right', '35px');
									$('.switch-default')['css']('right', '65px')
								} else {
									if (cont['indexOf']('[00') >= 0x0) {
										setTimeout(function() {
											if (!$('#wenkmLrc')['hasClass']('hide')) {
												songFrom44 = ' - Lrc歌词获取成功!'
											} else {
												songFrom44 = ' - Lrc歌词已关闭！'
											};
											wenkmLrc['lrc']['format'](cont)
										}, 0x1f4)
									} else {
										songFrom44 = ' - 暂无歌词!', $songFrom3['html']('<i class="fa fa-times-circle"></i> 暂无歌词');
										$('.switch-ksclrc')['hide']();
										$('.switch-down')['css']('right', '35px');
										$('.switch-default')['css']('right', '65px')
									}
								}
							},
							error: function() {
								songFrom44 = ' - 暂无歌词!', $songFrom3['html']('<i class="fa fa-times-circle"></i> 暂无歌词');
								$('.switch-ksclrc')['hide']();
								$('.switch-down')['css']('right', '35px');
								$('.switch-default')['css']('right', '65px')
							}
						})
					}
				}, 0x1f4)
			},
			lrc: {
				format: function(cont) {
					hasLrc = true;

					function formatTime(t) {
						var sp = t['split'](':'),
							min = +sp[0x0],
							sec = +sp[0x1]['split']('.')[0x0],
							ksec = +sp[0x1]['split']('.')[0x1];
						return min * 0x3c + sec + Math['round'](ksec / 1e3)
					};
					var lrcCont = cont['replace'](/\[[A-Za-z]+:(.*?)]/g, '')['replace']('\n', '')['split'](/[\]\[]/g),
						lrcLine = '';
					lrcTimeLine = [];
					for (var i = 0x1; i < lrcCont['length']; i += 0x2) {
						var timer = formatTime(lrcCont[i]);
						lrcTimeLine['push'](timer);
						if (i == 0x1) {
							lrcLine += '<li class="wenkmLrc' + timer + ' current">' + lrcCont[i + 0x1] + '</li>'
						} else {
							lrcLine += '<li class="wenkmLrc' + timer + '">' + lrcCont[i + 0x1] + '</li>'
						}
					};
					$('#wenkmLrc')['html']('<ul>' + lrcLine + '</ul>');
					setTimeout(function() {
						$('#wenkmLrc')['addClass']('show')
					}, 0x1f4);
					lrcTime = setInterval(wenkmLrc['lrc']['play'], 0x1f4)
				},
				play: function() {
					var timeNow = Math['round'](audio['currentTime']);
					if ($['inArray'](timeNow, lrcTimeLine) > 0x0) {
						var $lineNow = $('.wenkmLrc' + timeNow);
						if (!$lineNow['hasClass'](cur)) {
							$lineNow['addClass'](cur)['siblings']()['removeClass'](cur);
							$('#wenkmLrc')['animate']({
								scrollTop: lrcHeight * $lineNow['index']()
							})
						}
					} else {
						lrcCont = ''
					}
				},
				hide: function() {
					clearInterval(lrcTime);
					$('#wenkmLrc')['removeClass']('show')
				}
			}
		}
	}
};

function LimitStr(str, num, t) {
	num = num || 0x6;
	t = t || '...';
	var re = '';
	var leg = str['length'];
	var h = 0x0;
	for (var i = 0x0; h < num * 0x2 && i < leg; i++) {
		h += str['charCodeAt'](i) > 0x80 ? 0x2 : 0x1;
		re += str['charAt'](i)
	};
	if (i < leg) re += t;
	return re
};

function netmusic() {
	$['ajax']({
		url: api,
		dataType: 'jsonp',
		type: 'GET',
		data: {
			do: 'parse',
			type: musictype,
			id: wenkmList[albumId]['song_id'][songId]['replace'](songId + 0x1 + '#', '')['replace']('wy', '')['replace']('xm', '')['replace']('qq', '')['replace']('bd', '')
		},
		success: function(infos) {
			if (wenkmList[albumId]['song_id'][songId]['replace'](songId + 0x1 + '#', '')['indexOf']('wy') >= 0x0) {
				audio['src'] = infos['location']
			} else {
				audio['src'] = infos['location']
			};
			$('.switch-down')['show']();
			$('.switch-down')['html']('<a class="down"><i class="fa fa-cloud-download" title="从' + songFrom55 + '下载：' + wenkmList[albumId]['song_name'][songId]['replace'](songId + 1 + '#', '') + ' - ' + infos['artist_name'] + '"></i></a>');
			$('.down')['click'](function() {
				window['open'](audio['src'], 'newwindow')
			});
			if (wenkmList[albumId]['song_id'][songId]['replace'](songId + 0x1 + '#', '')['indexOf']('wy') >= 0x0) {
				lrcurl = api + '?do=lyric&type=wy&id=' + wenkmList[albumId]['song_id'][songId]['replace'](songId + 0x1 + '#', '')['replace']('wy', '')
			} else if (wenkmList[albumId]['song_id'][songId]['replace'](songId + 0x1 + '#', '')['indexOf']('qq') >= 0x0) {
				lrcurl = api + '?do=lyric&type=qq&id=' + infos['song_id']
			} else if (wenkmList[albumId]['song_id'][songId]['replace'](songId + 0x1 + '#', '')['indexOf']('bd') >= 0x0) {
				lrcurl = api + '?do=lyric&url=' + encodeURIComponent(infos['lyric'])
			} else {
				lrcurl = infos['lyric']
			};
			$songName['html']('<span title="' + wenkmList[albumId]['song_name'][songId]['replace'](songId + 0x1 + '#', '') + '">' + LimitStr(wenkmList[albumId]['song_name'][songId]['replace'](songId + 0x1 + '#', '')) + '</span>');
			window['console']['log'](name + ' - 当前播放：' + wenkmList[albumId]['song_name'][songId]['replace'](songId + 0x1 + '#', '') + ' - ' + infos['artist_name']);
			$songFrom['html']('<span title="' + infos['artist_name'] + '">' + LimitStr(infos['artist_name']) + '</span>');
			$songFrom1['html']('<span title="' + infos['album_name'] + '">' + LimitStr(infos['album_name']) + '</span>');
			allmusic();
			var coverImg = new Image();
			if (wenkmList[albumId]['song_id'][songId]['replace'](songId + 0x1 + '#', '')['indexOf']('wy') >= 0x0) {
				coverImg['src'] = infos['album_cover']
			} else {
				coverImg['src'] = infos['album_cover']
			};
			$cover['addClass']('changing');
			coverImg['onload'] = function() {
				setTimeout(function() {
					$('.myhk_pjax_loading_frame,.myhk_pjax_loading')['hide']()
				}, 0x320);
				setTimeout(function() {
					$cover['removeClass']('changing')
				}, 0x64);
				$['ajax']({
					url: api,
					type: 'GET',
					dataType: 'script',
					data: {
						do: 'color',
						url: coverImg['src']
					},
					success: function() {
						playercolor()
					},
					error: function() {
						var cont = '0,0,0';
						playercolor()
					}
				})
			};
			coverImg['error'] = function() {
				setTimeout(function() {
					$('.myhk_pjax_loading_frame,.myhk_pjax_loading')['hide']()
				}, 0x320);
				coverImg['src'] = 'http://q2.qlogo.cn/headimg_dl?dst_uin=1017959770&spec=640';
				setTimeout(function() {
					wenkmTips['show'](wenkmList[albumId]['song_name'][songId]['replace'](songId + 0x1 + '#', '') + ' - 专辑图片获取失败！')
				}, 4e3)
			};
			$cover['html'](coverImg);
			audio['volume'] = volume;
			wenkmTips['show']('开始从' + songFrom55 + '播放 - ' + wenkmList[albumId]['song_name'][songId]['replace'](songId + 0x1 + '#', ''));
			audio['play']();
			$cover['addClass']('coverplay');
			wenkmLrc['load']()
		},
		error: function(a, b, c) {
			setTimeout(function() {
				$('.myhk_pjax_loading_frame,.myhk_pjax_loading')['hide']()
			}, 0x320);
			setTimeout(function() {
				wenkmTips['show']('音乐播放器加载失败！')
			}, 4e3)
		}
	})
};

function allmusic() {
	musictooltip();
	if (!$('.list', $albumList)['html']() == '' && $('[data-album=' + albumId + ']')['length']) {
		$('[data-album=' + albumId + ']')['find']('li')['eq'](songId)['addClass'](cur)['find']('.artist')['html']('当前播放&nbsp;>&nbsp;')['parent']()['siblings']()['removeClass'](cur)['find']('.artist')['html']('')['parent']();
		$('.list', $albumList)['mCustomScrollbar']('scrollTo', $('li.current', $albumList)['position']()['top'] - 0x78)
	}
};

function playercolor() {
	$player['css']({
		background: 'rgba(' + cont + ',.8)'
	});
	$player1['css']({
		background: 'rgba(' + cont + ',.3)'
	});
	$tips['css']({
		background: 'rgba(' + cont + ',.6)'
	});
	$lk['css']({
		background: 'rgba(' + cont + ',.3)'
	})
};

function music(albums, ids) {
	$('#wenkmLrc,#wenkmKsc')['show']();
	albumId = albums - 0x1;
	$player['removeClass']('showSongList');
	$('.myhk_pjax_loading_frame,.myhk_pjax_loading')['show']();
	$['ajax']({
		url: user,
		type: 'GET',
		dataType: 'script',
		success: function() {
			$('.switch-default')['hide']();
			hasdefault = false;
			wenkmPlayer['newplayList']['creat']['album']();
			wenkmMedia['getInfos'](ids - 0x1);
			$('.play', $player)['click']()
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			wenkmTips['show']('歌曲列表获取失败!');
			$('.switch-default')['show']()
		}
	})
};

function musictooltip() {
	$('#wenkmPlayer span,#wenkmPlayer i')['each'](function() {
		$('#tooltip')['remove']();
		if (this['title']) {
			var a = this['title'];
			$(this)['mouseover'](function(b) {
				this['title'] = '';
				$('body')['append']('<div id="tooltip">' + a + '</div>');
				$('#tooltip')['css']({
					left: b['pageX'] - 0xf + 'px',
					top: b['pageY'] + 0x1e + 'px',
					opacity: '0.8'
				})['fadeIn'](0xfa)
			})['mouseout'](function() {
				this['title'] = a;
				$('#tooltip')['remove']()
			})['mousemove'](function(b) {
				$('#tooltip')['css']({
					left: b['pageX'] - 0xf + 'px',
					top: b['pageY'] + 0x1e + 'px'
				})
			})
		}
	})
};
$(window['document'])['ready'](function() {
	$(window)['keydown'](function(event) {
		var key = event['keyCode'];
		if (key == 0xc0) {
			auto = '';
			if (audio['paused']) {
				$('.play', $player)['click']()
			} else {
				$('.pause', $player)['click']()
			}
		}
	})
});
$(window)['scroll'](function() {
	var scrollTop = $(this)['scrollTop']();
	var scrollHeight = $(window['document'])['height']();
	var windowHeight = $(this)['height']();
	if (scrollTop + windowHeight == scrollHeight) {
		if (hasgeci) {
			if (ycgeci) {
				$player['addClass']('ksclrc');
				$('#wenkmLrc')['addClass']('hide');
				$('#wenkmKsc')['addClass']('hidePlayer');
				$songFrom3['html']('<i class="fa fa-times-circle"></i> 歌词暂时隐藏');
				$songFrom4['html']('<i class="fa fa-toggle-off" title="歌词暂时隐藏"></i>');
				if (hasLrc) {
					wenkmTips['show']('Lrc歌词自动隐藏')
				};
				if (hasKsc) {
					wenkmTips['show']('Ksc歌词自动隐藏')
				}
			}
		}
	} else {
		if (hasgeci) {
			if (ycgeci) {
				$player['removeClass']('ksclrc');
				$('#wenkmLrc')['removeClass']('hide');
				$('#wenkmKsc')['removeClass']('hidePlayer');
				if (hasLrc) {
					$songFrom3['html']('<i class="fa fa-check-circle"></i> Lrc歌词开启')
				};
				if (hasKsc) {
					$songFrom3['html']('<i class="fa fa-check-circle"></i> Ksc歌词开启')
				};
				$songFrom4['html']('<i class="fa fa-toggle-on" title="关闭歌词"></i>')
			}
		}
	};
	musictooltip()
});