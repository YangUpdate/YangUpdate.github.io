/* =========================================================
   Dev Runner 嵌入器
   —— 在主页底部插一个可以直接玩的小游戏

   用法（主页 index.html 只加下面这一行，放在 </body> 前）：
     <script src="/dev-runner-embed.js" defer></script>

   默认会自动插到 .home-content 的末尾（也就是所有 section 之后）。
   想自己指定位置的话，在你想放的地方写：
     <div id="dev-runner"></div>
   嵌入器会把这个占位替换成游戏区块。

   本文件不改动你的任何原有逻辑：
   · 中英文：沿用你的 data-zh / data-en 属性，你切语言时自动跟着变
   · 主题：监听 <html> 的 data-theme 变化，跟着切亮/暗
   · 样式：只用你现有的 CSS 变量，自动跟随主题
   ========================================================= */
(function () {
  'use strict';

  /* ---------- 可调配置 ---------- */
  var CFG = {
    src: '/runner/'   // 游戏所在地址（不带查询串；换位置只改这一处）
  };

  /* ---------- 防重复：页面里已经有 #game 就别再插一次 ---------- */
  if (document.getElementById('game')) return;

  /* ---------- 定位插入点 ---------- */
  var slot = document.getElementById('dev-runner');
  var parent = slot ? slot.parentNode : document.querySelector('.home-content');
  if (!parent) {
    // 找不到就跳过，绝不瞎猜位置；留句话方便排查
    console.warn('[Dev Runner] 未找到 .home-content，也未放置 <div id="dev-runner"> 占位，已跳过。');
    return;
  }

  /* ---------- 组装区块（复用你主页现有的 class） ---------- */
  var sec = document.createElement('section');
  sec.id = 'game';
  sec.className = 'home-section';
  sec.innerHTML =
    '<h2 data-zh="小游戏" data-en="Game">Game</h2>' +
    '<div class="card">' +
      '<div class="card__body">' +
        '<p data-zh="一个进程在代码里没完没了地跑，躲开 <code>;</code>、<code>{}</code> 和从代码里爬出来的 bug。撞上什么就报什么错。"' +
           ' data-en="A process that runs forever, dodging <code>;</code>, <code>{}</code> and bugs &mdash; until it throws.">' +
           'A process that runs forever, dodging <code>;</code>, <code>{}</code> and bugs &mdash; until it throws.</p>' +
        '<div class="dr-frame">' +
          '<iframe title="Dev Runner" loading="lazy"></iframe>' +
        '</div>' +
        '<p class="dr-link">' +
          '<a href="' + CFG.src + '" target="_blank" rel="noopener"' +
             ' data-zh="全屏打开 ↗" data-en="Open full screen ↗">Open full screen ↗</a>' +
        '</p>' +
      '</div>' +
    '</div>';

  if (slot) parent.replaceChild(sec, slot);
  else parent.appendChild(sec);

  /* ---------- 样式（只用你主页已有的 CSS 变量，自动跟主题走） ---------- */
  var st = document.createElement('style');
  st.textContent =
    '.dr-frame{margin:.6rem 0 .4rem;border:1px solid var(--border);' +
      'border-radius:var(--radius);overflow:hidden;line-height:0}' +   /* line-height:0 消掉 iframe 底部空隙 */
    '.dr-frame iframe{width:100%;height:210px;border:0;display:block}' +
    '@supports (aspect-ratio:1){.dr-frame iframe{height:auto;aspect-ratio:760/220}}' +
    '.dr-link{margin:0;font-size:.82rem;color:var(--text-muted)}' +
    '.dr-link a{color:var(--text-muted)}' +
    '.dr-link a:hover{color:var(--accent)}';
  document.head.appendChild(st);

  /* ---------- 中英文：沿用你的 data-zh / data-en 属性 ---------- */
  function applyLang() {
    var zh = (document.documentElement.lang || '').indexOf('zh') === 0;
    var els = sec.querySelectorAll('[data-en]');
    for (var i = 0; i < els.length; i++) {
      var v = zh ? els[i].getAttribute('data-zh') : els[i].getAttribute('data-en');
      if (v !== null) els[i].innerHTML = v;   // 用 innerHTML 是为了支持 <code>
    }
  }
  applyLang();
  // 兜底：即便你以后换了语言机制（不再统一遍历 [data-en]），这里仍能跟上
  new MutationObserver(applyLang).observe(document.documentElement, {
    attributes: true, attributeFilter: ['lang']
  });

  /* ---------- 主题：跟着 <html data-theme> 走 ---------- */
  var frame = sec.querySelector('iframe');
  var cur = null;
  function syncTheme() {
    var t = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    if (t === cur) return;          // 没真的变就别动，避免无谓重载
    cur = t;
    // src 万一已带查询串，用 & 拼而不是 ?
    frame.src = CFG.src + (CFG.src.indexOf('?') >= 0 ? '&' : '?') + 'embed=1&theme=' + t;
  }
  syncTheme();
  new MutationObserver(syncTheme).observe(document.documentElement, {
    attributes: true, attributeFilter: ['data-theme']
  });
})();
