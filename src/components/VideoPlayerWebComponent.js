class VideoPlayerWebComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    
    // 预设颜色选项
    this.colors = {
      blue: '#3b82f6',
      green: '#10b981',
      red: '#ef4444',
      purple: '#8b5cf6',
      orange: '#f59e0b'
    };
    
    // 默认颜色
    this.currentColor = 'blue';
    
    // 标记组件是否已连接
    this._isConnected = false;
  }

  static get observedAttributes() {
    return ['src', 'poster', 'controls', 'autoplay', 'loop', 'muted', 'color'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (name === 'color' && this.colors[newValue]) {
          this.currentColor = newValue;
          if (this._isConnected) {
            this.updateColor();
          }
        } else if (name === 'src' && this.video) {
        this.video.src = newValue;
      } else if (name === 'poster' && this.video) {
        this.video.poster = newValue;
      } else if (name === 'controls' && this.video) {
        this.video.controls = newValue !== null;
      } else if (name === 'autoplay' && this.video) {
        this.video.autoplay = newValue !== null;
      } else if (name === 'loop' && this.video) {
        this.video.loop = newValue !== null;
      } else if (name === 'muted' && this.video) {
        this.video.muted = newValue !== null;
      }
    }
  }

  connectedCallback() {
    this._isConnected = true;
    this.render();
    this.initializeVideo();
    this.initializeControls();
    this.updateColor();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          max-width: 800px;
          margin: 0 auto;
        }

        .video-card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          overflow: hidden;
        }

        .video-container {
          position: relative;
          width: 100%;
          padding-top: 56.25%; /* 16:9 aspect ratio */
          background: #000;
        }

        video {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .controls-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
          padding: 20px;
          transition: opacity 0.3s ease;
          opacity: 0;
        }

        .video-container:hover .controls-overlay {
          opacity: 1;
        }

        .controls {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .control-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .control-btn {
          background: none;
          border: 2px solid rgba(255, 255, 255, 0.8);
          color: white;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .control-btn:hover {
          background: rgba(255, 255, 255, 0.2);
          border-color: white;
          transform: scale(1.05);
        }

        .control-btn.active {
          background: var(--primary-color);
          border-color: var(--primary-color);
        }

        .progress-container {
          width: 100%;
          height: 6px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 3px;
          cursor: pointer;
          margin-bottom: 12px;
          overflow: hidden;
        }

        .progress-bar {
          height: 100%;
          background: var(--primary-color);
          border-radius: 3px;
          transition: width 0.1s ease;
          position: relative;
        }

        .progress-bar::after {
          content: '';
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 12px;
          height: 12px;
          background: white;
          border-radius: 50%;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .time-display {
          color: white;
          font-size: 14px;
          font-weight: 500;
          min-width: 100px;
          text-align: center;
        }

        .volume-control {
          display: flex;
          align-items: center;
          gap: 8px;
          min-width: 120px;
        }

        .volume-slider {
          width: 80px;
          height: 4px;
          -webkit-appearance: none;
          appearance: none;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 2px;
          outline: none;
          cursor: pointer;
        }

        .volume-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 12px;
          height: 12px;
          background: white;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .volume-slider::-moz-range-thumb {
          width: 12px;
          height: 12px;
          background: white;
          border-radius: 50%;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .speed-control {
          position: relative;
        }

        .speed-selector {
          background: rgba(0, 0, 0, 0.6);
          border: 2px solid rgba(255, 255, 255, 0.8);
          color: white;
          padding: 8px 16px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          backdrop-filter: blur(10px);
        }

        .speed-options {
          position: absolute;
          bottom: 100%;
          left: 0;
          background: rgba(0, 0, 0, 0.9);
          border: 2px solid rgba(255, 255, 255, 0.8);
          border-radius: 8px;
          padding: 8px;
          display: none;
          flex-direction: column;
          gap: 4px;
          min-width: 100px;
          z-index: 10;
        }

        .speed-options.active {
          display: flex;
        }

        .speed-option {
          color: white;
          padding: 8px 12px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          text-align: center;
          transition: background 0.2s ease;
        }

        .speed-option:hover,
        .speed-option.active {
          background: var(--primary-color);
        }

        .color-switcher-container {
          padding: 20px;
          background: white;
          border-top: 1px solid #e5e7eb;
        }

        .color-switcher {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .color-switcher-label {
          font-size: 14px;
          font-weight: 600;
          color: #374151;
          white-space: nowrap;
        }

        .color-option {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          cursor: pointer;
          border: 3px solid transparent;
          transition: all 0.3s ease;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .color-option:hover {
          transform: scale(1.1);
        }

        .color-option.active {
          border-color: #9ca3af;
          transform: scale(1.15);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        .color-option.blue {
          background: #3b82f6;
        }

        .color-option.green {
          background: #10b981;
        }

        .color-option.red {
          background: #ef4444;
        }

        .color-option.purple {
          background: #8b5cf6;
        }

        .color-option.orange {
          background: #f59e0b;
        }

        @media (max-width: 640px) {
          .controls {
            flex-direction: column;
            align-items: stretch;
            gap: 8px;
          }

          .control-group {
            justify-content: center;
          }

          .volume-control {
            display: none;
          }

          .speed-control {
            display: none;
          }

          .time-display {
            display: none;
          }
        }
      </style>

      <div class="video-card">
        <div class="video-container">
          <video
            ${this.hasAttribute('controls') ? 'controls' : ''}
            ${this.hasAttribute('autoplay') ? 'autoplay' : ''}
            ${this.hasAttribute('loop') ? 'loop' : ''}
            ${this.hasAttribute('muted') ? 'muted' : ''}
            ${this.getAttribute('poster') ? `poster="${this.getAttribute('poster')}"` : ''}
          >
            ${this.getAttribute('src') ? `<source src="${this.getAttribute('src')}" type="video/mp4">` : ''}
            您的浏览器不支持视频播放。
          </video>

          <div class="controls-overlay">
            <div class="progress-container">
              <div class="progress-bar"></div>
            </div>
            
            <div class="controls">
              <div class="control-group">
                <button class="control-btn play-pause-btn" title="播放/暂停">
                  ▶
                </button>
                <button class="control-btn volume-btn" title="音量">
                  🔊
                </button>
                <div class="volume-control">
                  <input type="range" class="volume-slider" min="0" max="1" step="0.01" value="1">
                </div>
              </div>

              <div class="time-display">
                <span class="current-time">00:00</span> / <span class="duration">00:00</span>
              </div>

              <div class="control-group">
                <button class="control-btn fullscreen-btn" title="全屏">
                  ⛶
                </button>
                <button class="control-btn pip-btn" title="画中画">
                  📺
                </button>
                <div class="speed-control">
                  <div class="speed-selector">
                    <span class="current-speed">1x</span>
                  </div>
                  <div class="speed-options">
                    <div class="speed-option active" data-speed="0.5">0.5x</div>
                    <div class="speed-option" data-speed="0.75">0.75x</div>
                    <div class="speed-option" data-speed="1">1x</div>
                    <div class="speed-option" data-speed="1.25">1.25x</div>
                    <div class="speed-option" data-speed="1.5">1.5x</div>
                    <div class="speed-option" data-speed="2">2x</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="color-switcher-container">
          <div class="color-switcher">
            <span class="color-switcher-label">主题颜色：</span>
            <div class="color-option blue active" data-color="blue" title="蓝色"></div>
            <div class="color-option green" data-color="green" title="绿色"></div>
            <div class="color-option red" data-color="red" title="红色"></div>
            <div class="color-option purple" data-color="purple" title="紫色"></div>
            <div class="color-option orange" data-color="orange" title="橙色"></div>
          </div>
        </div>
      </div>
    `;
  }

  initializeVideo() {
    this.video = this.shadowRoot.querySelector('video');
    this.progressContainer = this.shadowRoot.querySelector('.progress-container');
    this.progressBar = this.shadowRoot.querySelector('.progress-bar');
    this.currentTimeEl = this.shadowRoot.querySelector('.current-time');
    this.durationEl = this.shadowRoot.querySelector('.duration');

    if (this.video) {
      this.video.addEventListener('timeupdate', this.updateProgress.bind(this));
      this.video.addEventListener('loadedmetadata', this.updateDuration.bind(this));
      this.video.addEventListener('ended', this.handleVideoEnded.bind(this));
      this.video.addEventListener('play', this.updatePlayButton.bind(this));
      this.video.addEventListener('pause', this.updatePlayButton.bind(this));

      this.progressContainer.addEventListener('click', this.seekVideo.bind(this));
    }
  }

  initializeControls() {
    // 播放/暂停按钮
    this.playPauseBtn = this.shadowRoot.querySelector('.play-pause-btn');
    if (this.playPauseBtn) {
      this.playPauseBtn.addEventListener('click', this.togglePlayPause.bind(this));
    }

    // 音量控制
    this.volumeBtn = this.shadowRoot.querySelector('.volume-btn');
    this.volumeSlider = this.shadowRoot.querySelector('.volume-slider');
    if (this.volumeBtn && this.volumeSlider) {
      this.volumeBtn.addEventListener('click', this.toggleMute.bind(this));
      this.volumeSlider.addEventListener('input', this.changeVolume.bind(this));
    }

    // 全屏按钮
    this.fullscreenBtn = this.shadowRoot.querySelector('.fullscreen-btn');
    if (this.fullscreenBtn) {
      this.fullscreenBtn.addEventListener('click', this.toggleFullscreen.bind(this));
    }

    // 画中画按钮
    this.pipBtn = this.shadowRoot.querySelector('.pip-btn');
    if (this.pipBtn) {
      this.pipBtn.addEventListener('click', this.togglePictureInPicture.bind(this));
    }

    // 速度控制
    this.speedSelector = this.shadowRoot.querySelector('.speed-selector');
    this.speedOptions = this.shadowRoot.querySelector('.speed-options');
    if (this.speedSelector && this.speedOptions) {
      this.speedSelector.addEventListener('click', this.toggleSpeedOptions.bind(this));
      this.speedOptions.querySelectorAll('.speed-option').forEach(option => {
        option.addEventListener('click', (e) => this.changeSpeed(e));
      });

      // 点击外部关闭速度选项
      document.addEventListener('click', (e) => {
        if (!this.speedSelector.contains(e.target) && !this.speedOptions.contains(e.target)) {
          this.speedOptions.classList.remove('active');
        }
      });
    }

    // 颜色切换
    this.colorOptions = this.shadowRoot.querySelectorAll('.color-option');
    if (this.colorOptions) {
      this.colorOptions.forEach(option => {
        option.addEventListener('click', (e) => this.changeColor(e));
      });
    }
  }

  updateProgress() {
    if (!this.video) return;
    
    const progress = (this.video.currentTime / this.video.duration) * 100;
    this.progressBar.style.width = `${progress}%`;
    this.currentTimeEl.textContent = this.formatTime(this.video.currentTime);
  }

  updateDuration() {
    if (!this.video) return;
    this.durationEl.textContent = this.formatTime(this.video.duration);
  }

  formatTime(seconds) {
    if (isNaN(seconds)) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  seekVideo(e) {
    if (!this.video) return;
    
    const rect = this.progressContainer.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    this.video.currentTime = pos * this.video.duration;
  }

  togglePlayPause() {
    if (!this.video) return;
    
    if (this.video.paused || this.video.ended) {
      this.video.play();
    } else {
      this.video.pause();
    }
  }

  handleVideoEnded() {
    this.updatePlayButton();
  }

  updatePlayButton() {
    if (!this.playPauseBtn || !this.video) return;
    
    this.playPauseBtn.textContent = this.video.paused || this.video.ended ? '▶' : '⏸';
  }

  toggleMute() {
    if (!this.video) return;
    
    this.video.muted = !this.video.muted;
    this.volumeBtn.textContent = this.video.muted ? '🔇' : '🔊';
    if (this.volumeSlider) {
      this.volumeSlider.value = this.video.muted ? 0 : this.video.volume;
    }
  }

  changeVolume(e) {
    if (!this.video) return;
    
    this.video.volume = parseFloat(e.target.value);
    this.video.muted = this.video.volume === 0;
    this.volumeBtn.textContent = this.video.muted ? '🔇' : '🔊';
  }

  toggleFullscreen() {
    const videoContainer = this.shadowRoot.querySelector('.video-container');
    if (!videoContainer) return;

    if (!document.fullscreenElement) {
      videoContainer.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  togglePictureInPicture() {
    if (!this.video) return;

    if (!document.pictureInPictureElement) {
      this.video.requestPictureInPicture().catch(err => {
        console.error(`Error attempting to enable picture-in-picture: ${err.message}`);
      });
    } else {
      if (document.exitPictureInPicture) {
        document.exitPictureInPicture();
      }
    }
  }

  toggleSpeedOptions() {
    this.speedOptions.classList.toggle('active');
  }

  changeSpeed(e) {
    if (!this.video) return;
    
    const speed = parseFloat(e.target.dataset.speed);
    this.video.playbackRate = speed;
    
    // 更新显示
    this.shadowRoot.querySelector('.current-speed').textContent = `${speed}x`;
    
    // 更新激活状态
    this.speedOptions.querySelectorAll('.speed-option').forEach(option => {
      option.classList.remove('active');
    });
    e.target.classList.add('active');
    
    // 关闭选项
    this.speedOptions.classList.remove('active');
  }

  changeColor(e) {
    const color = e.target.dataset.color;
    if (this.colors[color]) {
      this.currentColor = color;
      this.updateColor();
      this.setAttribute('color', color);
    }
  }

  updateColor() {
    if (this.colors[this.currentColor]) {
      this.style.setProperty('--primary-color', this.colors[this.currentColor]);
      
      // 更新激活状态
      if (this.colorOptions) {
        this.colorOptions.forEach(option => {
          option.classList.remove('active');
          if (option.dataset.color === this.currentColor) {
            option.classList.add('active');
          }
        });
      }
    }
  }

  disconnectedCallback() {
    this._isConnected = false;
    if (this.video) {
      this.video.removeEventListener('timeupdate', this.updateProgress.bind(this));
      this.video.removeEventListener('loadedmetadata', this.updateDuration.bind(this));
      this.video.removeEventListener('ended', this.handleVideoEnded.bind(this));
      this.video.removeEventListener('play', this.updatePlayButton.bind(this));
      this.video.removeEventListener('pause', this.updatePlayButton.bind(this));
    }
  }
}

// 注册自定义元素
customElements.define('video-player-web', VideoPlayerWebComponent);