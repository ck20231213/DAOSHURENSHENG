/**
 * 动画工具类
 * 用于处理页面过渡动画和3D效果
 */

// 应用页面进入动画
const applyPageEnterAnimation = function(pageContext) {
  if (!pageContext) return;
  
  // 在数据中添加动画标志
  pageContext.setData({
    animationEnter: true
  });

  // 用setTimeout模拟动画完成
  setTimeout(() => {
    pageContext.setData({
      animationEnter: false
    });
  }, 800); // 动画持续时间
};

// 应用页面离开动画
const applyPageExitAnimation = function(pageContext, callback) {
  if (!pageContext) {
    if (typeof callback === 'function') {
      callback();
    }
    return;
  }
  
  // 设置离开动画标志
  pageContext.setData({
    animationExit: true
  });
  
  // 用setTimeout模拟动画完成后调用回调
  setTimeout(() => {
    if (typeof callback === 'function') {
      callback();
    }
    
    // 重置动画状态
    pageContext.setData({
      animationExit: false
    });
  }, 500); // 动画持续时间
};

// 创建3D卡片倾斜效果（模拟视差）
const createCardTiltEffect = function(e, pageContext, selector = '.card-3d') {
  // 获取触摸点在元素上的相对位置
  const card = e.currentTarget;
  const rect = e.detail;
  
  if (!rect || !rect.x || !rect.width) return;
  
  // 计算触摸点相对于卡片中心的位置
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  const touchX = e.touches[0].pageX - rect.left;
  const touchY = e.touches[0].pageY - rect.top;
  
  // 计算倾斜角度（最大10度）
  const tiltX = ((touchY - centerY) / centerY) * 5; // 垂直方向倾斜
  const tiltY = ((centerX - touchX) / centerX) * 5; // 水平方向倾斜
  
  // 通过setData更新样式
  const cardStyle = `transform: perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02); transition: none;`;
  
  // 更新样式
  pageContext.setData({
    cardStyle: cardStyle
  });
};

// 重置卡片倾斜效果
const resetCardTiltEffect = function(pageContext, selector = '.card-3d') {
  // 更新样式
  pageContext.setData({
    cardStyle: 'transform: perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1); transition: transform 0.5s ease-out;'
  });
};

// 创建鼠标跟随霓虹光效
const createFollowLight = function(e, pageContext) {
  // 计算光效位置
  const x = e.touches[0].pageX;
  const y = e.touches[0].pageY;
  
  // 更新光效位置
  pageContext.setData({
    glowPosition: {
      x: x,
      y: y,
      opacity: 1
    }
  });
  
  // 淡出效果
  setTimeout(() => {
    if (pageContext.data.glowPosition) {
      pageContext.setData({
        'glowPosition.opacity': 0
      });
    }
  }, 1000);
};

// 创建按钮波纹效果
const createRippleEffect = function(e, pageContext, className = 'ripple-effect') {
  const x = e.detail.x;
  const y = e.detail.y;
  
  // 模拟波纹效果，这里用数据变化代替
  pageContext.setData({
    ripplePosition: { x, y },
    showRipple: true
  });
  
  setTimeout(() => {
    pageContext.setData({
      showRipple: false
    });
  }, 600);
};

// 数字滚动动画
const animateNumber = function(pageContext, targetNumber, dataKey, duration = 1000) {
  const startTime = Date.now();
  const startValue = pageContext.data[dataKey] || 0;
  const difference = targetNumber - startValue;
  
  const step = () => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // 使用缓动函数
    const easeProgress = 1 - Math.pow(1 - progress, 3);
    const currentValue = Math.floor(startValue + difference * easeProgress);
    
    const updateData = {};
    updateData[dataKey] = currentValue;
    pageContext.setData(updateData);
    
    if (progress < 1) {
      requestAnimationFrame ? requestAnimationFrame(step) : setTimeout(step, 16);
    }
  };
  
  step();
};

// 创建浮动标签动画
const createFloatingLabel = function(pageContext, text, duration = 2000) {
  const labels = pageContext.data.floatingLabels || [];
  const newLabel = {
    id: Date.now(),
    text: text,
    x: Math.random() * 80 + 10, // 10% - 90%
    y: Math.random() * 30 + 20,  // 20% - 50%
    opacity: 1
  };
  
  labels.push(newLabel);
  pageContext.setData({
    floatingLabels: labels
  });
  
  // 淡出并移除
  setTimeout(() => {
    const currentLabels = pageContext.data.floatingLabels || [];
    const filteredLabels = currentLabels.filter(label => label.id !== newLabel.id);
    pageContext.setData({
      floatingLabels: filteredLabels
    });
  }, duration);
};

// 创建加载动画
const createLoadingAnimation = function(pageContext, show = true) {
  // 治愈系图片数组
  const healingImages = [
    '🌸', '🌺', '🌻', '🌼', '🌷', '🌹', '🌵', '🌲', '🌳', '🌿',
    '☘️', '🍀', '🌱', '🌾', '🍃', '🍇', '🍊', '🍋', '🍎', '🍓',
    '🦋', '🐝', '🐞', '🕊️', '🐰', '🐱', '🐶', '🐼', '🐧', '🐤',
    '⭐', '🌟', '✨', '💫', '🌙', '☀️', '🌈', '☁️', '🎈', '🎀',
    '💝', '🎁', '🏠', '🚀', '⛵', '🎯', '🎨', '📚', '💎', '🔮'
  ];
  
  if (show) {
    // 随机选择一个治愈图片
    const randomImage = healingImages[Math.floor(Math.random() * healingImages.length)];
    
    pageContext.setData({
      showLoading: true,
      currentHealingImage: randomImage
    });
    
    // 2秒后隐藏加载动画
    setTimeout(() => {
      pageContext.setData({
        showLoading: false
      });
    }, 2000);
  } else {
    pageContext.setData({
      showLoading: false
    });
  }
};

// 震动反馈
const vibrate = function(pattern = 'light') {
  if (wx.vibrateShort) {
    wx.vibrateShort({
      type: pattern
    });
  }
};

// 页面切换动画
const pageTransition = function(pageContext, direction = 'left') {
  const animationData = wx.createAnimation({
    duration: 300,
    timingFunction: 'ease-out'
  });
  
  if (direction === 'left') {
    animationData.translateX('-100%').step();
  } else {
    animationData.translateX('100%').step();
  }
  
  pageContext.setData({
    pageAnimation: animationData.export()
  });
  
  setTimeout(() => {
    animationData.translateX(0).step();
    pageContext.setData({
      pageAnimation: animationData.export()
    });
  }, 50);
};

// 创建星空背景动画
const createStarField = function(pageContext, count = 50) {
  const stars = [];
  
  for (let i = 0; i < count; i++) {
    stars.push({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.8 + 0.2,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2
    });
  }
  
  pageContext.setData({
    stars: stars
  });
};

// 文字打字效果
const typewriterEffect = function(pageContext, text, dataKey, speed = 100) {
  let index = 0;
  const interval = setInterval(() => {
    const currentText = text.substring(0, index + 1);
    const updateData = {};
    updateData[dataKey] = currentText;
    pageContext.setData(updateData);
    
    index++;
    if (index >= text.length) {
      clearInterval(interval);
    }
  }, speed);
};

module.exports = {
  applyPageEnterAnimation,
  applyPageExitAnimation,
  createCardTiltEffect,
  resetCardTiltEffect,
  createFollowLight,
  createRippleEffect,
  animateNumber,
  createFloatingLabel,
  createLoadingAnimation,
  vibrate,
  pageTransition,
  createStarField,
  typewriterEffect
}; 