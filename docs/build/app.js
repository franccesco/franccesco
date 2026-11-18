//#region node_modules/preact/dist/preact.module.js
var e, t, n, r, i, a, o, s, c, l, u, d, f, p, m = {}, h = [], g = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, _ = Array.isArray;
function v(e, t) {
	for (var n in t) e[n] = t[n];
	return e;
}
function y(e) {
	e && e.parentNode && e.parentNode.removeChild(e);
}
function b(t, n, r) {
	var i, a, o, s = {};
	for (o in n) o == "key" ? i = n[o] : o == "ref" ? a = n[o] : s[o] = n[o];
	if (arguments.length > 2 && (s.children = arguments.length > 3 ? e.call(arguments, 2) : r), typeof t == "function" && t.defaultProps != null) for (o in t.defaultProps) s[o] === void 0 && (s[o] = t.defaultProps[o]);
	return x(t, s, i, a, null);
}
function x(e, r, i, a, o) {
	var s = {
		type: e,
		props: r,
		key: i,
		ref: a,
		__k: null,
		__: null,
		__b: 0,
		__e: null,
		__c: null,
		constructor: void 0,
		__v: o ?? ++n,
		__i: -1,
		__u: 0
	};
	return o == null && t.vnode != null && t.vnode(s), s;
}
function S(e) {
	return e.children;
}
function C(e, t) {
	this.props = e, this.context = t;
}
function w(e, t) {
	if (t == null) return e.__ ? w(e.__, e.__i + 1) : null;
	for (var n; t < e.__k.length; t++) if ((n = e.__k[t]) != null && n.__e != null) return n.__e;
	return typeof e.type == "function" ? w(e) : null;
}
function T(e) {
	if (e.__P && e.__d) {
		var n = e.__v, r = n.__e, i = [], a = [], o = v({}, n);
		o.__v = n.__v + 1, t.vnode && t.vnode(o), te(e.__P, o, n, e.__n, e.__P.namespaceURI, 32 & n.__u ? [r] : null, i, r ?? w(n), !!(32 & n.__u), a), o.__v = n.__v, o.__.__k[o.__i] = o, re(i, o, a), n.__e = n.__ = null, o.__e != r && E(o);
	}
}
function E(e) {
	if ((e = e.__) != null && e.__c != null) return e.__e = e.__c.base = null, e.__k.some(function(t) {
		if (t != null && t.__e != null) return e.__e = e.__c.base = t.__e;
	}), E(e);
}
function D(e) {
	(!e.__d && (e.__d = !0) && r.push(e) && !O.__r++ || i != t.debounceRendering) && ((i = t.debounceRendering) || a)(O);
}
function O() {
	try {
		for (var e, t = 1; r.length;) r.length > t && r.sort(o), e = r.shift(), t = r.length, T(e);
	} finally {
		r.length = O.__r = 0;
	}
}
function ee(e, t, n, r, i, a, o, s, c, l, u) {
	var d, f, p, g, _, v, y = r && r.__k || h, b = t.length;
	for (c = k(n, t, y, c, b), d = 0; d < b; d++) (p = n.__k[d]) != null && (f = p.__i != -1 && y[p.__i] || m, p.__i = d, v = te(e, p, f, i, a, o, s, c, l, u), g = p.__e, p.ref && f.ref != p.ref && (f.ref && oe(f.ref, null, p), u.push(p.ref, p.__c || g, p)), _ == null && g != null && (_ = g), 4 & p.__u ? (c = A(p, c, e), f.__e &&= null) : typeof p.type == "function" && v !== void 0 ? c = v : g && (c = g.nextSibling), p.__u &= -7);
	return n.__e = _, c;
}
function k(e, t, n, r, i) {
	var a, o, s, c, l, u = n.length, d = u, f = 0;
	for (e.__k = Array(i), a = 0; a < i; a++) (o = t[a]) != null && typeof o != "boolean" && typeof o != "function" ? (typeof o == "string" || typeof o == "number" || typeof o == "bigint" || o.constructor == String ? o = e.__k[a] = x(null, o, null, null, null) : _(o) ? o = e.__k[a] = x(S, { children: o }, null, null, null) : o.constructor === void 0 && o.__b > 0 ? o = e.__k[a] = x(o.type, o.props, o.key, o.ref ? o.ref : null, o.__v) : e.__k[a] = o, c = a + f, o.__ = e, o.__b = e.__b + 1, s = null, (l = o.__i = j(o, n, c, d)) != -1 && (d--, (s = n[l]) && (s.__u |= 2)), s == null || s.__v == null ? (l == -1 && (i > u ? f-- : i < u && f++), typeof o.type != "function" && (o.__u |= 4)) : l != c && (l == c - 1 ? f-- : l == c + 1 ? f++ : (l > c ? f-- : f++, o.__u |= 4))) : e.__k[a] = null;
	if (d) for (a = 0; a < u; a++) (s = n[a]) != null && !(2 & s.__u) && (s.__e == r && (r = w(s)), se(s, s));
	return r;
}
function A(e, t, n) {
	var r, i;
	if (typeof e.type == "function") {
		for (r = e.__k, i = 0; r && i < r.length; i++) r[i] && (r[i].__ = e, t = A(r[i], t, n));
		return t;
	}
	e.__e != t && (t && e.type && !t.parentNode && (t = w(e)), t = n.insertBefore(e.__e, t || null));
	do
		t &&= t.nextSibling;
	while (t != null && t.nodeType == 8);
	return t;
}
function j(e, t, n, r) {
	var i, a, o, s = e.key, c = e.type, l = t[n], u = l != null && (2 & l.__u) == 0;
	if (l === null && s == null || u && s == l.key && c == l.type) return n;
	if (r > +!!u) {
		for (i = n - 1, a = n + 1; i >= 0 || a < t.length;) if ((l = t[o = i >= 0 ? i-- : a++]) != null && !(2 & l.__u) && s == l.key && c == l.type) return o;
	}
	return -1;
}
function M(e, t, n) {
	t[0] == "-" ? e.setProperty(t, n ?? "") : e[t] = n == null ? "" : typeof n != "number" || g.test(t) ? n : n + "px";
}
function N(e, t, n, r, i) {
	var a, o;
	n: if (t == "style") if (typeof n == "string") e.style.cssText = n;
	else {
		if (typeof r == "string" && (e.style.cssText = r = ""), r) for (t in r) n && t in n || M(e.style, t, "");
		if (n) for (t in n) r && n[t] == r[t] || M(e.style, t, n[t]);
	}
	else if (t[0] == "o" && t[1] == "n") a = t != (t = t.replace(u, "$1")), o = t.toLowerCase(), t = o in e || t == "onFocusOut" || t == "onFocusIn" ? o.slice(2) : t.slice(2), e.l ||= {}, e.l[t + a] = n, n ? r ? n[l] = r[l] : (n[l] = d, e.addEventListener(t, a ? p : f, a)) : e.removeEventListener(t, a ? p : f, a);
	else {
		if (i == "http://www.w3.org/2000/svg") t = t.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
		else if (t != "width" && t != "height" && t != "href" && t != "list" && t != "form" && t != "tabIndex" && t != "download" && t != "rowSpan" && t != "colSpan" && t != "role" && t != "popover" && t in e) try {
			e[t] = n ?? "";
			break n;
		} catch {}
		typeof n == "function" || (n == null || !1 === n && t[4] != "-" ? e.removeAttribute(t) : e.setAttribute(t, t == "popover" && n == 1 ? "" : n));
	}
}
function P(e) {
	return function(n) {
		if (this.l) {
			var r = this.l[n.type + e];
			if (n[c] == null) n[c] = d++;
			else if (n[c] < r[l]) return;
			return r(t.event ? t.event(n) : n);
		}
	};
}
function te(e, n, r, i, a, o, s, c, l, u) {
	var d, f, p, m, g, b, x, T, E, D, O, k, A, j, M, N, P = n.type;
	if (n.constructor !== void 0) return null;
	128 & r.__u && (l = !!(32 & r.__u), o = [c = n.__e = r.__e]), (d = t.__b) && d(n);
	n: if (typeof P == "function") {
		f = s.length;
		try {
			if (E = n.props, D = P.prototype && P.prototype.render, O = (d = P.contextType) && i[d.__c], k = d ? O ? O.props.value : d.__ : i, r.__c ? T = (p = n.__c = r.__c).__ = p.__E : (D ? n.__c = p = new P(E, k) : (n.__c = p = new C(E, k), p.constructor = P, p.render = ce), O && O.sub(p), p.state ||= {}, p.__n = i, m = p.__d = !0, p.__h = [], p._sb = []), D && p.__s == null && (p.__s = p.state), D && P.getDerivedStateFromProps != null && (p.__s == p.state && (p.__s = v({}, p.__s)), v(p.__s, P.getDerivedStateFromProps(E, p.__s))), g = p.props, b = p.state, p.__v = n, m) D && P.getDerivedStateFromProps == null && p.componentWillMount != null && p.componentWillMount(), D && p.componentDidMount != null && p.__h.push(p.componentDidMount);
			else {
				if (D && P.getDerivedStateFromProps == null && E !== g && p.componentWillReceiveProps != null && p.componentWillReceiveProps(E, k), n.__v == r.__v || !p.__e && p.shouldComponentUpdate != null && !1 === p.shouldComponentUpdate(E, p.__s, k)) {
					n.__v != r.__v && (p.props = E, p.state = p.__s, p.__d = !1), n.__e = r.__e, n.__k = r.__k, n.__k.some(function(e) {
						e && (e.__ = n);
					}), h.push.apply(p.__h, p._sb), p._sb = [], p.__h.length && s.push(p), c = w(r);
					break n;
				}
				p.componentWillUpdate != null && p.componentWillUpdate(E, p.__s, k), D && p.componentDidUpdate != null && p.__h.push(function() {
					p.componentDidUpdate(g, b, x);
				});
			}
			if (p.context = k, p.props = E, p.__P = e, p.__e = !1, A = t.__r, j = 0, D) p.state = p.__s, p.__d = !1, A && A(n), d = p.render(p.props, p.state, p.context), h.push.apply(p.__h, p._sb), p._sb = [];
			else do
				p.__d = !1, A && A(n), d = p.render(p.props, p.state, p.context), p.state = p.__s;
			while (p.__d && ++j < 25);
			p.state = p.__s, p.getChildContext != null && (i = v(v({}, i), p.getChildContext())), D && !m && p.getSnapshotBeforeUpdate != null && (x = p.getSnapshotBeforeUpdate(g, b)), M = d != null && d.type === S && d.key == null ? ie(d.props.children) : d, c = ee(e, _(M) ? M : [M], n, r, i, a, o, s, c, l, u), p.base = n.__e, n.__u &= -161, p.__h.length && s.push(p), T && (p.__E = p.__ = null);
		} catch (e) {
			if (s.length = f, n.__v = null, l || o != null) {
				if (e.then) {
					for (n.__u |= l ? 160 : 128; c && c.nodeType == 8 && c.nextSibling;) c = c.nextSibling;
					o != null && (o[o.indexOf(c)] = null), n.__e = c;
				} else if (o != null) for (N = o.length; N--;) y(o[N]);
			} else n.__e = r.__e;
			n.__k ??= r.__k || [], e.then || ne(n), t.__e(e, n, r);
		}
	} else o == null && n.__v == r.__v ? (n.__k = r.__k, n.__e = r.__e) : c = n.__e = ae(r.__e, n, r, i, a, o, s, l, u);
	return (d = t.diffed) && d(n), 128 & n.__u ? void 0 : c;
}
function ne(e) {
	e && (e.__c && (e.__c.__e = !0), e.__k && e.__k.some(ne));
}
function re(e, n, r) {
	for (var i = 0; i < r.length; i++) oe(r[i], r[++i], r[++i]);
	t.__c && t.__c(n, e), e.some(function(n) {
		try {
			e = n.__h, n.__h = [], e.some(function(e) {
				e.call(n);
			});
		} catch (e) {
			t.__e(e, n.__v);
		}
	});
}
function ie(e) {
	return typeof e != "object" || !e || e.__b > 0 ? e : _(e) ? e.map(ie) : e.constructor === void 0 ? v({}, e) : null;
}
function ae(n, r, i, a, o, s, c, l, u) {
	var d, f, p, h, g, v, b, x = i.props || m, S = r.props, C = r.type;
	if (C == "svg" ? o = "http://www.w3.org/2000/svg" : C == "math" ? o = "http://www.w3.org/1998/Math/MathML" : o ||= "http://www.w3.org/1999/xhtml", s != null) {
		for (d = 0; d < s.length; d++) if ((g = s[d]) && "setAttribute" in g == !!C && (C ? g.localName == C : g.nodeType == 3)) {
			n = g, s[d] = null;
			break;
		}
	}
	if (n == null) {
		if (C == null) return document.createTextNode(S);
		n = document.createElementNS(o, C, S.is && S), l &&= (t.__m && t.__m(r, s), !1), s = null;
	}
	if (C == null) x === S || l && n.data == S || (n.data = S);
	else {
		if (s = C == "textarea" && S.defaultValue != null ? null : s && e.call(n.childNodes), !l && s != null) for (x = {}, d = 0; d < n.attributes.length; d++) x[(g = n.attributes[d]).name] = g.value;
		for (d in x) g = x[d], d == "dangerouslySetInnerHTML" ? p = g : d == "children" || d in S || d == "value" && "defaultValue" in S || d == "checked" && "defaultChecked" in S || N(n, d, null, g, o);
		for (d in S) g = S[d], d == "children" ? h = g : d == "dangerouslySetInnerHTML" ? f = g : d == "value" ? v = g : d == "checked" ? b = g : l && typeof g != "function" || x[d] === g || N(n, d, g, x[d], o);
		if (f) l || p && (f.__html == p.__html || f.__html == n.innerHTML) || (n.innerHTML = f.__html), r.__k = [];
		else if (p && (n.innerHTML = ""), ee(r.type == "template" ? n.content : n, _(h) ? h : [h], r, i, a, C == "foreignObject" ? "http://www.w3.org/1999/xhtml" : o, s, c, s ? s[0] : i.__k && w(i, 0), l, u), s != null) for (d = s.length; d--;) y(s[d]);
		l && C != "textarea" || (d = "value", C == "progress" && v == null ? n.removeAttribute("value") : v != null && (v !== n[d] || C == "progress" && !v || C == "option" && v != x[d]) && N(n, d, v, x[d], o), d = "checked", b != null && b != n[d] && N(n, d, b, x[d], o));
	}
	return n;
}
function oe(e, n, r) {
	try {
		if (typeof e == "function") {
			var i = typeof e.__u == "function";
			i && e.__u(), i && n == null || (e.__u = e(n));
		} else e.current = n;
	} catch (e) {
		t.__e(e, r);
	}
}
function se(e, n, r) {
	var i, a;
	if (t.unmount && t.unmount(e), (i = e.ref) && (i.current && i.current != e.__e || oe(i, null, n)), (i = e.__c) != null) {
		if (i.componentWillUnmount) try {
			i.componentWillUnmount();
		} catch (e) {
			t.__e(e, n);
		}
		i.base = i.__P = i.__n = null;
	}
	if (i = e.__k) for (a = 0; a < i.length; a++) i[a] && se(i[a], n, r || typeof e.type != "function");
	r || y(e.__e), e.__c = e.__ = e.__e = void 0;
}
function ce(e, t, n) {
	return this.constructor(e, n);
}
function le(n, r, i) {
	var a, o, s, c;
	r == document && (r = document.documentElement), t.__ && t.__(n, r), o = (a = typeof i == "function") ? null : i && i.__k || r.__k, s = [], c = [], te(r, n = (!a && i || r).__k = b(S, null, [n]), o || m, m, r.namespaceURI, !a && i ? [i] : o ? null : r.firstChild ? e.call(r.childNodes) : null, s, !a && i ? i : o ? o.__e : r.firstChild, a, c), re(s, n, c), n.props.children = null;
}
e = h.slice, t = { __e: function(e, t, n, r) {
	for (var i, a, o; t = t.__;) if ((i = t.__c) && !i.__) try {
		if ((a = i.constructor) && a.getDerivedStateFromError != null && (i.setState(a.getDerivedStateFromError(e)), o = i.__d), i.componentDidCatch != null && (i.componentDidCatch(e, r || {}), o = i.__d), o) return i.__E = i;
	} catch (t) {
		e = t;
	}
	throw e;
} }, n = 0, C.prototype.setState = function(e, t) {
	var n = this.__s != null && this.__s != this.state ? this.__s : this.__s = v({}, this.state);
	typeof e == "function" && (e = e(v({}, n), this.props)), e && v(n, e), e != null && this.__v && (t && this._sb.push(t), D(this));
}, C.prototype.forceUpdate = function(e) {
	this.__v && (this.__e = !0, e && this.__h.push(e), D(this));
}, C.prototype.render = S, r = [], a = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, o = function(e, t) {
	return e.__v.__b - t.__v.__b;
}, O.__r = 0, s = Math.random().toString(8), c = "__d" + s, l = "__a" + s, u = /(PointerCapture)$|Capture$/i, d = 0, f = P(!1), p = P(!0);
//#endregion
//#region node_modules/preact/hooks/dist/hooks.module.js
var F, I, ue, de, L = 0, fe = [], R = t, pe = R.__b, me = R.__r, he = R.diffed, ge = R.__c, _e = R.unmount, ve = R.__;
function z(e, t) {
	R.__h && R.__h(I, e, L || t), L = 0;
	var n = I.__H ||= {
		__: [],
		__h: []
	};
	return e >= n.__.length && n.__.push({}), n.__[e];
}
function B(e) {
	return L = 1, ye(Oe, e);
}
function ye(e, t, n) {
	var r = z(F++, 2);
	if (r.t = e, !r.__c && (r.__ = [n ? n(t) : Oe(void 0, t), function(e) {
		var t = r.__N ? r.__N[0] : r.__[0], n = r.t(t, e);
		t !== n && (r.__N = [n, r.__[1]], r.__c.setState({}));
	}], r.__c = I, !I.__f)) {
		var i = function(e, t, n) {
			if (!r.__c.__H) return !0;
			var i = !1, o = r.__c.props !== e;
			if (r.__c.__H.__.some(function(e) {
				if (e.__N) {
					i = !0;
					var t = e.__[0];
					e.__ = e.__N, e.__N = void 0, t !== e.__[0] && (o = !0);
				}
			}), a) {
				var s = a.call(this, e, t, n);
				return i ? s || o : s;
			}
			return !i || o;
		};
		I.__f = !0;
		var a = I.shouldComponentUpdate, o = I.componentWillUpdate;
		I.componentWillUpdate = function(e, t, n) {
			if (this.__e) {
				var r = a;
				a = void 0, i(e, t, n), a = r;
			}
			o && o.call(this, e, t, n);
		}, I.shouldComponentUpdate = i;
	}
	return r.__N || r.__;
}
function V(e, t) {
	var n = z(F++, 3);
	!R.__s && De(n.__H, t) && (n.__ = e, n.u = t, I.__H.__h.push(n));
}
function be(e, t) {
	var n = z(F++, 4);
	!R.__s && De(n.__H, t) && (n.__ = e, n.u = t, I.__h.push(n));
}
function H(e) {
	return L = 5, xe(function() {
		return { current: e };
	}, []);
}
function xe(e, t) {
	var n = z(F++, 7);
	return De(n.__H, t) && (n.__ = e(), n.__H = t, n.__h = e), n.__;
}
function Se(e, t) {
	return L = 8, xe(function() {
		return e;
	}, t);
}
function Ce() {
	for (var e; e = fe.shift();) {
		var t = e.__H;
		if (e.__P && t) try {
			t.__h.some(U), t.__h.some(Ee), t.__h = [];
		} catch (n) {
			t.__h = [], R.__e(n, e.__v);
		}
	}
}
R.__b = function(e) {
	I = null, pe && pe(e);
}, R.__ = function(e, t) {
	e && t.__k && t.__k.__m && (e.__m = t.__k.__m), ve && ve(e, t);
}, R.__r = function(e) {
	me && me(e), F = 0;
	var t = (I = e.__c).__H;
	t && (ue === I ? (t.__h = [], I.__h = [], t.__.some(function(e) {
		e.__N && (e.__ = e.__N), e.u = e.__N = void 0;
	})) : (t.__h.some(U), t.__h.some(Ee), t.__h = [], F = 0)), ue = I;
}, R.diffed = function(e) {
	he && he(e);
	var t = e.__c;
	t && t.__H && (t.__H.__h.length && (fe.push(t) !== 1 && de === R.requestAnimationFrame || ((de = R.requestAnimationFrame) || Te)(Ce)), t.__H.__.some(function(e) {
		e.u &&= (e.__H = e.u, void 0);
	})), ue = I = null;
}, R.__c = function(e, t) {
	t.some(function(e) {
		try {
			e.__h.some(U), e.__h = e.__h.filter(function(e) {
				return !e.__ || Ee(e);
			});
		} catch (n) {
			t.some(function(e) {
				e.__h &&= [];
			}), t = [], R.__e(n, e.__v);
		}
	}), ge && ge(e, t);
}, R.unmount = function(e) {
	_e && _e(e);
	var t, n = e.__c;
	n && n.__H && (n.__H.__.some(function(e) {
		try {
			U(e);
		} catch (e) {
			t = e;
		}
	}), n.__H = void 0, t && R.__e(t, n.__v));
};
var we = typeof requestAnimationFrame == "function";
function Te(e) {
	var t, n = function() {
		clearTimeout(r), we && cancelAnimationFrame(t), setTimeout(e);
	}, r = setTimeout(n, 35);
	we && (t = requestAnimationFrame(n));
}
function U(e) {
	var t = I, n = e.__c;
	typeof n == "function" && (e.__c = void 0, n()), I = t;
}
function Ee(e) {
	var t = I;
	e.__c = e.__(), I = t;
}
function De(e, t) {
	return !e || e.length !== t.length || t.some(function(t, n) {
		return t !== e[n];
	});
}
function Oe(e, t) {
	return typeof t == "function" ? t(e) : t;
}
//#endregion
//#region docs/content.js
var ke = null, W = /* @__PURE__ */ new Map(), Ae = /* @__PURE__ */ new Map();
function je(e) {
	if (!W.has(e)) {
		let t = fetch(`articles/${e}.md`).then((e) => e.ok ? e.text() : Promise.reject(/* @__PURE__ */ Error(`HTTP ${e.status}`)));
		t.catch(() => W.delete(e)), W.set(e, t);
	}
	return W.get(e);
}
function Me(e) {
	return Promise.all([je(e), import("./chunks/markdown-DFDvBfbN.js")]).then(([t, n]) => (ke = n, Ae.has(e) || Ae.set(e, n.render(t)), Ae.get(e)));
}
var Ne = (e) => Ae.get(e) ?? null, Pe = (e) => {
	Me(e).catch(() => {});
}, Fe = (e) => ke?.highlight(e), Ie = {
	chart: "\n............\n.........##.\n.........##.\n.....##..##.\n.....##..##.\n.....##..##.\n.##..##..##.\n.##..##..##.\n.##..##..##.\n.##..##..##.\n############\n............",
	team: "\n............\n.###....###.\n.###....###.\n.###....###.\n............\n.###....###.\n#####..#####\n#####..#####\n#####..#####\n#####..#####\n............\n............",
	db: "\n............\n..########..\n.#........#.\n.##########.\n.#........#.\n.##########.\n.#........#.\n.##########.\n.#........#.\n..########..\n............\n............",
	flask: "\n............\n...######...\n....#..#....\n....#..#....\n....#..#....\n...#....#...\n..#......#..\n.#..####..#.\n.#.######.#.\n.##########.\n............\n............",
	gem: "\n............\n..########..\n.#.#....#.#.\n#..#....#..#\n############\n.#..#..#..#.\n..#.#..#.#..\n...#.##.#...\n....####....\n.....##.....\n............\n............",
	prompt: "\n............\n############\n#..........#\n#.#........#\n#..#.......#\n#...#......#\n#..#.......#\n#.#...####.#\n#..........#\n############\n............\n............",
	braces: "\n............\n...##..##...\n..#......#..\n..#......#..\n..#......#..\n.#........#.\n..#......#..\n..#......#..\n..#......#..\n...##..##...\n............\n............",
	lock: "\n............\n....####....\n...#....#...\n...#....#...\n...#....#...\n.##########.\n.##########.\n.####..####.\n.####..####.\n.##########.\n.##########.\n............",
	box: "\n............\n.##########.\n.#...##...#.\n.#...##...#.\n.##########.\n.#........#.\n.#........#.\n.#........#.\n.#........#.\n.##########.\n............\n............",
	globe: "\n............\n...######...\n..#..##..#..\n.#..#..#..#.\n.#..#..#..#.\n.##########.\n.#..#..#..#.\n.#..#..#..#.\n..#..##..#..\n...######...\n............\n............",
	file: "\n............\n..######....\n..#....##...\n..#....#.#..\n..#....###..\n..#......#..\n..#.####.#..\n..#......#..\n..#.####.#..\n..#......#..\n..########..\n............",
	log: "\n............\n............\n.#.########.\n............\n.#.######...\n............\n.#.########.\n............\n.#.#####....\n............\n............\n............",
	progress: "\n............\n............\n............\n############\n#..........#\n#.######...#\n#.######...#\n#..........#\n############\n............\n............\n............",
	deploy: "\n............\n.....##.....\n....####....\n...######...\n..########..\n.....##.....\n.....##.....\n.....##.....\n............\n.##########.\n.##########.\n............",
	book: "\n............\n............\n.####..####.\n#....##....#\n#....##....#\n#....##....#\n#....##....#\n#....##....#\n############\n............\n............\n............",
	check: "\n............\n.##########.\n.#........#.\n.#......#.#.\n.#.....#..#.\n.#.#..#...#.\n.#..##....#.\n.#........#.\n.#........#.\n.##########.\n............\n............",
	chat: "\n............\n.##########.\n.#........#.\n.#.######.#.\n.#........#.\n.#.####...#.\n.#........#.\n.##########.\n...##.......\n...#........\n............\n............",
	mail: "\n............\n............\n############\n##........##\n#.##....##.#\n#...####...#\n#..........#\n#..........#\n############\n............\n............\n............",
	git: "\n............\n.###...###..\n.#.#...#.#..\n.###...###..\n..#.....#...\n..#######...\n..#.........\n.###........\n.#.#........\n.###........\n............\n............",
	linkedin: "\n............\n############\n#..........#\n#.##.......#\n#..........#\n#.##.####..#\n#.##.##.##.#\n#.##.##.##.#\n#.##.##.##.#\n#..........#\n############\n............",
	x: "\n............\n.##......##.\n..##....##..\n...##..##...\n....####....\n.....##.....\n....####....\n...##..##...\n..##....##..\n.##......##.\n............\n............",
	case: "\n............\n....####....\n....#..#....\n############\n#..........#\n#..........#\n#....##....#\n#..........#\n#..........#\n############\n............\n............",
	user: "\n............\n....####....\n....####....\n....####....\n....####....\n............\n..########..\n.##########.\n.##########.\n.##########.\n............\n............"
}, Le = {};
function Re(e, t) {
	let n = "";
	return e.forEach((e, r) => {
		for (let i = 0; i < e.length; i += 1) {
			if (e[i] !== t) continue;
			let a = i;
			for (; e[a + 1] === t;) a += 1;
			n += `M${i} ${r}h${a - i + 1}v1h-${a - i + 1}z`, i = a;
		}
	}), n;
}
function ze(e) {
	if (!Le[e]) {
		let t = (Ie[e] || Ie.file).trim().split("\n");
		Le[e] = [Re(t, "#"), Re(t, "@")];
	}
	return Le[e];
}
//#endregion
//#region node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js
var Be = 0;
Array.isArray;
function G(e, n, r, i, a, o) {
	n ||= {};
	var s, c, l = n;
	if ("ref" in l) for (c in l = {}, n) c == "ref" ? s = n[c] : l[c] = n[c];
	var u = {
		type: e,
		props: l,
		key: r,
		ref: s,
		__k: null,
		__: null,
		__b: 0,
		__e: null,
		__c: null,
		constructor: void 0,
		__v: --Be,
		__i: -1,
		__u: 0,
		__source: a,
		__self: o
	};
	if (typeof e == "function" && (s = e.defaultProps)) for (c in s) l[c] === void 0 && (l[c] = s[c]);
	return t.vnode && t.vnode(u), u;
}
//#endregion
//#region docs/Components.jsx
var K = {
	name: "Francesco Orozco",
	role: "AI Engineer & Data Scientist",
	company: "Bloom Growth",
	host: "thatai.dev",
	email: "franccesco@thatai.dev",
	github: "github.com/franccesco",
	twitter: "@franccesco",
	linkedin: "linkedin.com/in/franccesco"
}, q = [
	"dark",
	"light",
	"cream"
], Ve = [
	"data",
	"python",
	"ruby",
	"web",
	"tools"
], He = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec"
];
function Ue(e) {
	let t = /^(\d{4})-(\d{2})-(\d{2})/.exec(e || "");
	return t ? `${He[t[2] - 1]} ${t[3]}, ${t[1]}` : e || "";
}
var J = (e) => `#/writing/${e}`;
function Y({ topic: e = "", q: t = "", page: n = 1 } = {}) {
	let r = new URLSearchParams();
	e && r.set("topic", e), t && r.set("q", t), n > 1 && r.set("page", n);
	let i = r.toString();
	return i ? `#/?${i}` : "#/";
}
var We = (e) => ({
	onPointerEnter: () => Pe(e),
	onFocus: () => Pe(e)
});
function X({ name: e, size: t = 24 }) {
	let [n, r] = ze(e);
	return /* @__PURE__ */ G("svg", {
		class: "px",
		viewBox: "0 0 12 12",
		width: t,
		height: t,
		"shape-rendering": "crispEdges",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ G("path", {
			d: n,
			fill: "currentColor"
		}), r && /* @__PURE__ */ G("path", {
			class: "px-accent",
			d: r
		})]
	});
}
function Z({ children: e }) {
	return /* @__PURE__ */ G("span", {
		class: "k",
		"aria-hidden": "true",
		children: [
			"[",
			e,
			"]"
		]
	});
}
var Ge = [[
	"home",
	"H",
	"#/"
], [
	"contact",
	"C",
	"#/contact"
]], Ke = [
	["j k", "next / previous entry"],
	["enter", "open"],
	["[ ]", "turn the page"]
], qe = [["t", "next theme"], ["?", "keys and commands"]];
function Je({ route: e }) {
	let t = e === "home" ? [...Ke, qe[0]] : qe;
	return /* @__PURE__ */ G("header", {
		class: "top",
		children: [
			/* @__PURE__ */ G("a", {
				class: "brand",
				href: "#/",
				"aria-label": `${K.name}, home`,
				children: [/* @__PURE__ */ G("span", {
					class: "mono",
					"aria-hidden": "true",
					children: [/* @__PURE__ */ G("span", {
						class: "mono-f",
						children: "f"
					}), /* @__PURE__ */ G("span", { class: "mono-dot" })]
				}), /* @__PURE__ */ G("span", {
					class: "brand-host",
					"aria-hidden": "true",
					children: K.host
				})]
			}),
			/* @__PURE__ */ G("nav", {
				class: "nav",
				"aria-label": "Main",
				children: Ge.map(([t, n, r]) => /* @__PURE__ */ G("a", {
					href: r,
					class: e === t ? "on" : "",
					"aria-current": e === t ? "page" : void 0,
					children: [
						/* @__PURE__ */ G(Z, { children: n }),
						" ",
						/* @__PURE__ */ G("span", { children: t })
					]
				}, t))
			}),
			/* @__PURE__ */ G("div", {
				class: "top-keys",
				"aria-hidden": "true",
				children: t.map(([e, t]) => /* @__PURE__ */ G("span", { children: [
					/* @__PURE__ */ G("b", { children: e }),
					" ",
					t
				] }, e))
			})
		]
	});
}
var Ye = [
	[
		"mail",
		"Email",
		`mailto:${K.email}`,
		K.email
	],
	[
		"git",
		"GitHub",
		`https://${K.github}`,
		K.github
	],
	[
		"linkedin",
		"LinkedIn",
		`https://${K.linkedin}`,
		K.linkedin
	],
	[
		"x",
		"X",
		`https://twitter.com/${K.twitter.replace("@", "")}`,
		K.twitter
	]
];
function Xe({ article: e }) {
	return /* @__PURE__ */ G("a", {
		class: "entry",
		"data-entry": !0,
		href: J(e.slug),
		...We(e.slug),
		children: [
			/* @__PURE__ */ G(X, { name: e.icon }),
			/* @__PURE__ */ G("span", {
				class: "entry-date",
				children: Ue(e.date)
			}),
			/* @__PURE__ */ G("span", {
				class: "entry-title",
				children: /* @__PURE__ */ G("span", {
					class: "hl",
					children: e.title
				})
			}),
			/* @__PURE__ */ G("span", {
				class: "entry-min",
				children: [e.minutes, " min"]
			})
		]
	});
}
function Ze({ article: e }) {
	return /* @__PURE__ */ G("a", {
		class: "feat",
		"data-entry": !0,
		href: J(e.slug),
		...We(e.slug),
		children: [/* @__PURE__ */ G("span", {
			class: "tile",
			children: /* @__PURE__ */ G(X, {
				name: e.icon,
				size: 72
			})
		}), /* @__PURE__ */ G("span", {
			class: "feat-body",
			children: [
				/* @__PURE__ */ G("span", {
					class: "chips",
					children: [
						/* @__PURE__ */ G("span", {
							class: "chip chip-on",
							children: "Latest"
						}),
						/* @__PURE__ */ G("span", {
							class: "chip",
							children: e.topic
						}),
						/* @__PURE__ */ G("span", {
							class: "feat-min",
							children: [e.minutes, " min"]
						})
					]
				}),
				/* @__PURE__ */ G("span", {
					class: "feat-title",
					children: e.title
				}),
				/* @__PURE__ */ G("span", {
					class: "feat-dek",
					children: e.description
				}),
				/* @__PURE__ */ G("span", {
					class: "feat-date",
					children: Ue(e.date)
				})
			]
		})]
	});
}
function Qe({ articles: e, featureFirst: t = !1, extra: n = "", listRef: r, ...i }) {
	let [a, ...o] = e;
	return a ? /* @__PURE__ */ G("div", {
		class: `entries ${n}`,
		ref: r,
		...i,
		children: [G(t ? Ze : Xe, { article: a }), o.map((e) => /* @__PURE__ */ G(Xe, { article: e }, e.slug))]
	}) : null;
}
//#endregion
//#region docs/Article.jsx
var $e = 140, et = () => typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function tt({ items: e, active: t }) {
	if (e.length === 0) return null;
	let n = (e, t) => {
		e.preventDefault(), document.getElementById(t)?.scrollIntoView({ behavior: et() ? "auto" : "smooth" });
	};
	return /* @__PURE__ */ G("nav", {
		class: "tree",
		"aria-label": "Contents",
		children: [/* @__PURE__ */ G("h2", {
			class: "label",
			children: "Tree"
		}), e.map((e) => /* @__PURE__ */ G("a", {
			href: `#${e.id}`,
			onClick: (t) => n(t, e.id),
			class: `${e.sub ? "sub" : ""}${e.id === t ? " on" : ""}`,
			children: e.text
		}, e.id))]
	});
}
function nt({ newer: e, older: t }) {
	return !e && !t ? null : /* @__PURE__ */ G("nav", {
		class: "pager",
		"aria-label": "More writing",
		children: [e ? /* @__PURE__ */ G("a", {
			href: J(e.slug),
			...We(e.slug),
			children: [/* @__PURE__ */ G("span", {
				class: "pager-dir",
				children: [/* @__PURE__ */ G(Z, { children: "[" }), " Newer"]
			}), /* @__PURE__ */ G("span", { children: e.title })]
		}) : /* @__PURE__ */ G("span", {}), t ? /* @__PURE__ */ G("a", {
			class: "pager-next",
			href: J(t.slug),
			...We(t.slug),
			children: [/* @__PURE__ */ G("span", {
				class: "pager-dir",
				children: ["Older ", /* @__PURE__ */ G(Z, { children: "]" })]
			}), /* @__PURE__ */ G("span", { children: t.title })]
		}) : /* @__PURE__ */ G("span", {})]
	});
}
function rt({ slug: e, articles: t, back: n }) {
	let [r, i] = B(() => Ne(e)), [a, o] = B(null), [s, c] = B([]), [l, u] = B(""), [d, f] = B(!1), p = H(null), m = H(null), h = t.findIndex((t) => t.slug === e), g = t[h];
	return V(() => {
		if (r) return;
		let t = !1;
		return Me(e).then((e) => {
			t || i(e);
		}).catch((e) => {
			t || o(e.message);
		}), () => {
			t = !0;
		};
	}, []), V(() => {
		if (typeof IntersectionObserver != "function") return;
		let e = new IntersectionObserver(([e]) => f(!e.isIntersecting));
		return e.observe(m.current), () => e.disconnect();
	}, []), V(() => {
		if (!r || !p.current) return;
		Fe(p.current);
		let e = [...p.current.querySelectorAll("h2, h3")];
		e.forEach((e, t) => {
			e.id = `s${t}`;
		}), c(e.map((e) => ({
			id: e.id,
			text: e.textContent,
			sub: e.tagName === "H3"
		})));
		let t = 0, n = () => {
			t = 0;
			let n = "";
			for (let t of e) {
				if (t.getBoundingClientRect().top > $e) break;
				n = t.id;
			}
			u(n);
		}, i = () => {
			t ||= requestAnimationFrame(n);
		};
		return n(), window.addEventListener("scroll", i, { passive: !0 }), () => {
			window.removeEventListener("scroll", i), cancelAnimationFrame(t);
		};
	}, [r]), /* @__PURE__ */ G("article", {
		class: "cols page",
		children: [/* @__PURE__ */ G("aside", {
			class: "side art-side",
			children: [
				/* @__PURE__ */ G("a", {
					class: "back",
					href: n,
					children: "← cd .."
				}),
				/* @__PURE__ */ G("div", {
					class: "art-facts",
					children: [/* @__PURE__ */ G("div", {
						class: `art-id${d ? " docked" : ""}`,
						children: [/* @__PURE__ */ G("span", {
							class: "tile",
							children: /* @__PURE__ */ G(X, {
								name: g?.icon || "file",
								size: 72
							})
						}), /* @__PURE__ */ G("a", {
							class: "art-id-title",
							href: "#/",
							"aria-hidden": "true",
							tabindex: -1,
							onClick: (e) => {
								e.preventDefault(), window.scrollTo({
									top: 0,
									behavior: et() ? "auto" : "smooth"
								});
							},
							children: g ? g.title : e
						})]
					}), g && /* @__PURE__ */ G("dl", {
						class: "meta",
						children: [
							/* @__PURE__ */ G("div", { children: [/* @__PURE__ */ G("dt", { children: "published" }), /* @__PURE__ */ G("dd", { children: Ue(g.date) })] }),
							/* @__PURE__ */ G("div", { children: [/* @__PURE__ */ G("dt", { children: "topic" }), /* @__PURE__ */ G("dd", { children: /* @__PURE__ */ G("a", {
								href: Y({ topic: g.topic }),
								children: g.topic
							}) })] }),
							/* @__PURE__ */ G("div", { children: [/* @__PURE__ */ G("dt", { children: "reading time" }), /* @__PURE__ */ G("dd", { children: [g.minutes, " min"] })] })
						]
					})]
				}),
				/* @__PURE__ */ G(tt, {
					items: s,
					active: l
				})
			]
		}), /* @__PURE__ */ G("div", {
			class: "main",
			children: [
				/* @__PURE__ */ G("h1", {
					ref: m,
					class: "art-title",
					children: g ? g.title : e
				}),
				g?.description && /* @__PURE__ */ G("p", {
					class: "art-dek",
					children: g.description
				}),
				/* @__PURE__ */ G("div", {
					class: "art-main",
					children: [
						a && /* @__PURE__ */ G("p", {
							class: "status",
							children: [
								"Couldn’t load this essay: ",
								/* @__PURE__ */ G("code", { children: a }),
								"."
							]
						}),
						!a && !r && /* @__PURE__ */ G("p", {
							class: "status",
							children: "Loading…"
						}),
						r && /* @__PURE__ */ G("div", {
							ref: p,
							class: "article-body",
							dangerouslySetInnerHTML: { __html: r }
						}),
						r && /* @__PURE__ */ G(nt, {
							newer: t[h - 1],
							older: h < 0 ? null : t[h + 1]
						})
					]
				})
			]
		})]
	});
}
//#endregion
//#region docs/Contact.jsx
function it({ icon: e, label: t, value: n, href: r, copyable: i = !1 }) {
	let [a, o] = B(!1), s = r.startsWith("http");
	return /* @__PURE__ */ G("div", {
		class: "crow",
		children: [
			/* @__PURE__ */ G(X, { name: e }),
			/* @__PURE__ */ G("span", {
				class: "crow-label",
				children: t
			}),
			/* @__PURE__ */ G("a", {
				href: r,
				target: s ? "_blank" : void 0,
				rel: s ? "noopener noreferrer" : void 0,
				children: [n, s && " ↗"]
			}),
			i && /* @__PURE__ */ G("button", {
				type: "button",
				class: "copy",
				onClick: () => {
					navigator.clipboard?.writeText(n).catch(() => {}), o(!0), setTimeout(() => o(!1), 1400);
				},
				"aria-label": `Copy ${t}`,
				children: a ? "copied" : "copy"
			})
		]
	});
}
function at() {
	return /* @__PURE__ */ G("div", {
		class: "cols page",
		children: [/* @__PURE__ */ G("aside", {
			class: "side",
			children: [/* @__PURE__ */ G("h1", {
				class: "page-title",
				children: "Say hi."
			}), /* @__PURE__ */ G("p", {
				class: "lede",
				children: "Easiest way to reach me is email — I usually reply within a day or two."
			})]
		}), /* @__PURE__ */ G("div", {
			class: "main",
			children: [/* @__PURE__ */ G("section", { children: [/* @__PURE__ */ G("h2", {
				class: "label",
				children: "Channels"
			}), /* @__PURE__ */ G("div", {
				class: "crows",
				children: [
					/* @__PURE__ */ G(it, {
						icon: "mail",
						label: "Email",
						value: K.email,
						href: `mailto:${K.email}`,
						copyable: !0
					}),
					/* @__PURE__ */ G(it, {
						icon: "git",
						label: "GitHub",
						value: K.github,
						href: `https://${K.github}`
					}),
					/* @__PURE__ */ G(it, {
						icon: "linkedin",
						label: "LinkedIn",
						value: K.linkedin,
						href: `https://${K.linkedin}`
					}),
					/* @__PURE__ */ G(it, {
						icon: "x",
						label: "Twitter / X",
						value: K.twitter,
						href: `https://twitter.com/${K.twitter.replace("@", "")}`
					})
				]
			})] }), /* @__PURE__ */ G("section", {
				class: "avail",
				children: [/* @__PURE__ */ G("span", {
					class: "avail-dot",
					"aria-hidden": "true"
				}), /* @__PURE__ */ G("div", { children: [/* @__PURE__ */ G("p", { children: [
					/* @__PURE__ */ G("strong", { children: "At Bloom Growth full-time." }),
					" ",
					"Not looking for new roles — but always open to a conversation about ",
					/* @__PURE__ */ G("em", { children: "Scout" }),
					", agent design, evals, or the data underneath any of it."
				] }), /* @__PURE__ */ G("p", {
					class: "stamp",
					children: "Last updated · May 2026"
				})] })]
			})]
		})]
	});
}
//#endregion
//#region docs/Landing.jsx
function Q({ name: e, label: t, note: n, meta: r, foot: i, active: a = !1, paneRef: o, children: s }) {
	return /* @__PURE__ */ G("section", {
		class: `pane pane-${e}${a ? " pane-on" : ""}`,
		"aria-label": t,
		ref: o,
		children: [
			/* @__PURE__ */ G("div", {
				class: "pane-head",
				children: [
					/* @__PURE__ */ G("span", {
						class: "pane-name",
						children: e
					}),
					n,
					r
				]
			}),
			/* @__PURE__ */ G("div", {
				class: "pane-body",
				children: s
			}),
			i
		]
	});
}
var ot = "(min-width: 1181px)", st = 5, ct = 8;
function lt(e, t) {
	let n = [];
	for (let r = 0; r < e;) {
		let i = Math.min(e, r + (t && r === 0 ? st : ct));
		n.push([r, i]), r = i;
	}
	return n;
}
function ut(e, t) {
	let n = [], r = 0, i = 0;
	return e.forEach((e, a) => {
		a > r && i + e > t && (n.push([r, a]), r = a, i = 0), i += e;
	}), e.length > 0 && n.push([r, e.length]), n;
}
function dt(e) {
	let [t, n] = B(() => window.matchMedia(e).matches);
	return V(() => {
		let t = window.matchMedia(e), r = () => n(t.matches);
		return t.addEventListener("change", r), () => t.removeEventListener("change", r);
	}, [e]), t;
}
function ft(e, t) {
	let n = dt(ot), r = H(null), i = H(null), [a, o] = B(null);
	return be(() => {
		if (!n || !i.current) {
			o(null);
			return;
		}
		let e = () => {
			let e = ut([...i.current.children].map((e) => e.offsetHeight), r.current.clientHeight - 1);
			o((t) => String(t) === String(e) ? t : e);
		};
		e();
		let t = new ResizeObserver(e);
		return t.observe(r.current), t.observe(i.current), () => t.disconnect();
	}, [
		n,
		e,
		t
	]), {
		tiled: n,
		box: r,
		ghost: i,
		pages: n && a || lt(e.length, t)
	};
}
function pt({ page: e, count: t, hrefFor: n, onTurn: r }) {
	let i = (e, i) => e >= 1 && e <= t ? /* @__PURE__ */ G("a", {
		href: n(e),
		onClick: (t) => {
			t.preventDefault(), r(e);
		},
		children: i
	}) : /* @__PURE__ */ G("span", {
		class: "off",
		"aria-hidden": "true",
		children: i
	});
	return /* @__PURE__ */ G("nav", {
		class: "pane-foot",
		"aria-label": "Pages of writing",
		children: [
			i(e - 1, /* @__PURE__ */ G(S, { children: [/* @__PURE__ */ G(Z, { children: "[" }), " Newer"] })),
			/* @__PURE__ */ G("span", {
				"aria-live": "polite",
				children: [
					"Page ",
					e,
					" / ",
					t
				]
			}),
			i(e + 1, /* @__PURE__ */ G(S, { children: ["Older ", /* @__PURE__ */ G(Z, { children: "]" })] }))
		]
	});
}
function mt({ articles: e, loc: t, go: n, pager: r }) {
	let { topic: i, q: a } = t, o = xe(() => {
		let t = a.toLowerCase();
		return e.filter((e) => (!i || e.topic === i) && (!t || `${e.title} ${e.description}`.toLowerCase().includes(t)));
	}, [
		e,
		i,
		a
	]), s = !!(i || a), { tiled: c, box: l, ghost: u, pages: d } = ft(o, !s), f = Math.max(1, d.length), p = Math.min(t.page, f), [m, h] = d[p - 1] || [0, 0], g = H(null), _ = H(null), v = H(null), y = H(!1), b = (e) => Y({
		topic: i,
		q: a,
		page: e
	}), x = (e, t = null) => e < 1 || e > f || e === p ? !1 : (_.current = t, n(b(e), !0), !0);
	r.current = {
		page: p,
		count: f,
		turnTo: x
	};
	let S = `${i}|${a}|${p}`;
	return v.current !== null && v.current !== S && (y.current = !0), V(() => {
		let e = v.current === null;
		if (v.current = S, e) return;
		let t = g.current.getBoundingClientRect().top;
		if ((t < 0 || t > window.innerHeight * .6) && g.current.scrollIntoView({ block: "start" }), _.current) {
			let e = g.current.querySelectorAll(".entries:not(.ghost) [data-entry]");
			e[_.current === "last" ? e.length - 1 : 0]?.focus({ preventScroll: !0 }), _.current = null;
		}
	}, [S]), /* @__PURE__ */ G(Q, {
		name: "writing",
		label: "Writing",
		active: !0,
		paneRef: g,
		note: s && /* @__PURE__ */ G("span", {
			class: "pane-filter",
			children: [/* @__PURE__ */ G("span", { children: [i && `ls ${i}`, a && `grep "${a}"`].filter(Boolean).join(" | ") }), /* @__PURE__ */ G("a", {
				class: "more",
				href: "#/",
				children: "clear"
			})]
		}),
		meta: o.length > 0 && /* @__PURE__ */ G("span", {
			class: "pane-range",
			children: [
				m + 1,
				"–",
				h,
				" of ",
				o.length
			]
		}),
		foot: f > 1 && /* @__PURE__ */ G(pt, {
			page: p,
			count: f,
			hrefFor: b,
			onTurn: x
		}),
		children: /* @__PURE__ */ G("div", {
			class: "list",
			ref: l,
			children: [
				e.length > 0 && o.length === 0 && /* @__PURE__ */ G("p", {
					class: "status",
					children: [
						"No entries match. Type ",
						/* @__PURE__ */ G("b", { children: "ls" }),
						" to list everything."
					]
				}),
				/* @__PURE__ */ G(Qe, {
					articles: o.slice(m, h),
					featureFirst: !s && m === 0,
					extra: y.current ? "swap" : ""
				}, S),
				c && /* @__PURE__ */ G(Qe, {
					articles: o,
					featureFirst: !s,
					extra: "ghost",
					listRef: u,
					"aria-hidden": "true"
				})
			]
		})
	});
}
function ht({ when: e, role: t, where: n, note: r }) {
	return /* @__PURE__ */ G("div", {
		class: "job",
		children: [
			/* @__PURE__ */ G("div", {
				class: "job-when",
				children: [/* @__PURE__ */ G(X, {
					name: "case",
					size: 12
				}), /* @__PURE__ */ G("span", { children: e })]
			}),
			/* @__PURE__ */ G("div", {
				class: "job-role",
				children: [
					t,
					" ",
					/* @__PURE__ */ G("span", {
						class: "job-where",
						children: ["· ", n]
					})
				]
			}),
			/* @__PURE__ */ G("p", {
				class: "job-note",
				children: r
			})
		]
	});
}
function gt({ articles: e, loc: t, go: n, pager: r }) {
	return /* @__PURE__ */ G("div", {
		class: "panes",
		children: [/* @__PURE__ */ G("div", {
			class: "panes-left",
			children: [/* @__PURE__ */ G("div", {
				class: "panes-top",
				children: [/* @__PURE__ */ G(Q, {
					name: "portrait",
					label: "Portrait",
					children: /* @__PURE__ */ G("img", {
						class: "photo",
						src: "assets/portrait-400.webp",
						srcset: "assets/portrait-320.webp 320w, assets/portrait-400.webp 400w, assets/portrait-640.webp 640w, assets/portrait-800.webp 800w",
						sizes: "(max-width: 600px) 100vw, (max-width: 820px) 40vw, 384px",
						width: "400",
						height: "500",
						decoding: "async",
						alt: K.name
					})
				}), /* @__PURE__ */ G(Q, {
					name: "about",
					label: "About",
					children: [
						/* @__PURE__ */ G("p", {
							class: "prompt",
							"aria-hidden": "true",
							children: [/* @__PURE__ */ G("span", { children: "$" }), " whoami"]
						}),
						/* @__PURE__ */ G("h1", {
							class: "home-name",
							children: K.name
						}),
						/* @__PURE__ */ G("p", {
							class: "home-role",
							children: [
								K.role,
								" at ",
								K.company,
								"."
							]
						}),
						/* @__PURE__ */ G("p", {
							class: "bio",
							children: [
								"I build ",
								/* @__PURE__ */ G("em", {
									class: "serif",
									children: "agentic systems"
								}),
								" for complex problems. Right now that’s ",
								/* @__PURE__ */ G("em", { children: "Scout" }),
								" — an agent at ",
								/* @__PURE__ */ G("strong", { children: "Bloom Growth" }),
								" people can delegate their work to, 24/7. Before agents, a few years on the data underneath: pipelines, models, and the decisions that run on top."
							]
						}),
						/* @__PURE__ */ G("a", {
							class: "btn",
							href: "#/contact",
							children: [
								/* @__PURE__ */ G(Z, { children: "C" }),
								"Let’s connect",
								/* @__PURE__ */ G("span", {
									class: "btn-arrow",
									"aria-hidden": "true",
									children: "→"
								})
							]
						})
					]
				})]
			}), /* @__PURE__ */ G(Q, {
				name: "work",
				label: "What I’ve worked on",
				meta: /* @__PURE__ */ G("span", { children: "2019 — now" }),
				children: [/* @__PURE__ */ G("p", {
					class: "note",
					children: "Mostly behind the scenes — work for companies, not personal projects. Happy to talk about any of it."
				}), /* @__PURE__ */ G("div", {
					class: "jobs",
					children: [/* @__PURE__ */ G(ht, {
						when: "2019 — now",
						role: "Data Scientist & AI Engineer",
						where: "Bloom Growth",
						note: "Started in analytics and machine learning — pulling insight out of product data, unifying databanks across platforms. Grew into running the AI project cycle end-to-end and modernizing how we collect, store, and catalogue data. Most of my time now goes to Scout and the agent stack around it."
					}), /* @__PURE__ */ G(ht, {
						when: "2022",
						role: "Customer Data Scientist",
						where: "Deepnote",
						note: "A short stint helping customers evaluate and adopt Deepnote — practical product demos, plus notebook templates for prospective teams."
					})]
				})]
			})]
		}), /* @__PURE__ */ G("div", {
			class: "panes-right",
			children: [/* @__PURE__ */ G(mt, {
				articles: e,
				loc: t,
				go: n,
				pager: r
			}), /* @__PURE__ */ G(Q, {
				name: "contact",
				label: "Contact",
				children: Ye.map(([e, t, n, r]) => /* @__PURE__ */ G("a", {
					class: "channel",
					href: n,
					target: n.startsWith("http") ? "_blank" : void 0,
					rel: n.startsWith("http") ? "noopener noreferrer" : void 0,
					children: [
						/* @__PURE__ */ G(X, {
							name: e,
							size: 12
						}),
						/* @__PURE__ */ G("span", {
							class: "channel-label",
							children: t
						}),
						/* @__PURE__ */ G("span", { children: r })
					]
				}, e))
			})]
		})]
	});
}
//#endregion
//#region docs/Terminal.jsx
var _t = [
	"# keys",
	["h  c", "home, contact"],
	["j  k", "next / previous entry; scrolls inside an article"],
	["enter", "open the selected entry"],
	["[  ]", "newer / older: page of the list, or article"],
	["g  G", "top / bottom of the page"],
	["t", "next theme"],
	["/", "focus this prompt"],
	["esc", "leave the prompt"],
	"# commands",
	["ls [topic]", `list writing: ${Ve.join(", ")}`],
	["grep <text>", "search titles and descriptions"],
	["next, prev", "older / newer: page of the list, or article"],
	["page <n>", "jump to a page of the list"],
	["← →", "turn the page, while the prompt is empty"],
	["open <slug>", "open an article"],
	["tab", "complete from the options listed as you type"],
	["cd <path>", "cd contact, cd .., cd ~"],
	["theme [name]", q.join(", ")],
	["whoami, email", "who runs this site, and how to reach them"],
	["top, clear", "scroll to top, clear this output"]
], vt = {
	help: () => _t,
	ls: (e, { go: t }) => e && !Ve.includes(e) ? [`ls: no topic "${e}". Topics: ${Ve.join(", ")}.`] : t(Y({ topic: e })),
	grep: (e, { go: t }) => e ? t(Y({ q: e })) : ["usage: grep <text>"],
	open: (e, { go: t, articles: n }) => {
		if (!e) return ["usage: open <slug>"];
		let r = e.toLowerCase(), i = n.find((e) => e.slug === r), a = i ? [i] : n.filter((e) => e.slug.includes(r) || e.title.toLowerCase().includes(r));
		return a.length === 0 ? [`open: nothing matches "${e}"`] : t(a.length === 1 ? J(a[0].slug) : Y({ q: e }));
	},
	cd: (e, t) => {
		let n = e.replace(/^(~|\.)?\/+/, "").replace(/\/+$/, "");
		if (!n || n === "~" || n === "writing") return t.go("#/");
		if (n === "..") return t.go(t.loc.route === "article" ? t.back : "#/");
		if (n === "contact") return t.go("#/contact");
		let r = n.replace(/^writing\//, "");
		return t.articles.some((e) => e.slug === r) ? t.go(J(r)) : [`cd: no such path: ${e}`];
	},
	theme: (e, { theme: t, setTheme: n }) => {
		if (e && !q.includes(e)) return [`theme: choose one of ${q.join(", ")}`];
		let r = e || q[(q.indexOf(t) + 1) % q.length];
		return n(r), [`theme: ${r}`];
	},
	next: (e, { step: t, loc: n }) => t(1) ? void 0 : [`next: ${yt(n, "older")}`],
	prev: (e, { step: t, loc: n }) => t(-1) ? void 0 : [`prev: ${yt(n, "newer")}`],
	page: (e, { loc: t, go: n, pager: r }) => {
		if (t.route !== "home") return n(Y({ page: Number(e) || 1 }));
		let { page: i, count: a, turnTo: o } = r.current;
		if (!/^\d+$/.test(e)) return [`page ${i} of ${a}. usage: page <n>`];
		if (e < 1 || e > a) return [`page: choose 1 to ${a}`];
		o(Number(e));
	},
	top: () => window.scrollTo({ top: 0 }),
	home: (e, { go: t }) => t("#/"),
	contact: (e, { go: t }) => t("#/contact"),
	pwd: (e, { path: t }) => [t],
	whoami: () => [
		`${K.name} — ${K.role} at ${K.company}.`,
		"You are guest. Type contact to change that.",
		`© ${(/* @__PURE__ */ new Date()).getFullYear()} ${K.name}`
	],
	email: () => [{
		text: K.email,
		href: `mailto:${K.email}`
	}],
	clear: () => void 0
};
vt.cat = vt.open;
function yt(e, t) {
	return e.route === "home" ? `no ${t} page` : e.route === "article" ? `no ${t} article` : "nothing to page through here";
}
function bt(e, { articles: t }) {
	let n = t.map((e) => e.slug);
	return e === "ls" ? Ve : e === "theme" ? q : e === "open" || e === "cat" ? n : e === "cd" ? [
		"contact",
		"..",
		"~",
		...n.map((e) => `writing/${e}`)
	] : [];
}
function xt(e, t) {
	let [, n, r, i, a] = /^(\/?)(\S*)(\s+)?(.*)$/.exec(e), o = i === void 0, s = o ? Object.keys(vt) : bt(r, t), c = o ? r : a;
	return {
		typingCommand: o,
		prefix: c,
		head: o ? n : `${n}${r} `,
		hits: s.filter((e) => e.startsWith(c))
	};
}
function St(e) {
	let t = e[0];
	for (let n of e) for (; !n.startsWith(t);) t = t.slice(0, -1);
	return t;
}
function Ct(e) {
	return e.route === "home" ? "~" : e.route === "article" ? `~/writing/${e.slug}` : `~/${e.route}`;
}
function wt(e) {
	return e.route === "home" ? e.page > 1 ? `page ${e.page}` : e.q ? `grep ${e.q}` : e.topic ? `ls ${e.topic}` : "cd ~" : `cd ${Ct(e)}`;
}
function Tt({ line: e }) {
	return Array.isArray(e) ? /* @__PURE__ */ G("div", {
		class: "term-pair",
		children: [/* @__PURE__ */ G("span", { children: e[0] }), /* @__PURE__ */ G("span", { children: e[1] })]
	}) : e.href ? /* @__PURE__ */ G("div", { children: /* @__PURE__ */ G("a", {
		href: e.href,
		children: e.text
	}) }) : e.startsWith("# ") ? /* @__PURE__ */ G("div", {
		class: "term-head",
		children: e.slice(2)
	}) : /* @__PURE__ */ G("div", { children: e });
}
function Et({ loc: e, articles: t, theme: n, setTheme: r, go: i, step: a, pager: o, back: s, api: c }) {
	let [l, u] = B(""), [d, f] = B(null), [p, m] = B(""), [h, g] = B(0), [_, v] = B(!1), y = H(null), b = H(null), x = H([]), S = H(0), C = H(!1), w = H(!1), T = Ct(e), E = e.route === "home", D = {
		loc: e,
		articles: t,
		theme: n,
		setTheme: r,
		go: i,
		step: a,
		pager: o,
		back: s,
		path: T
	}, O = wt(e), ee = (e) => {
		let t = e.trim().replace(/^\//, "");
		if (!t) return f(null);
		let [n, ...r] = t.split(/\s+/), i = vt[n.toLowerCase()], a = i ? i(r.join(" "), D) : [`command not found: ${n}. Type help for the list.`];
		f(Array.isArray(a) ? a : null);
	};
	c.current = {
		focus: (e = "") => {
			u(e), b.current?.focus();
		},
		run: (e) => {
			ee(e), b.current?.focus();
		}
	};
	let k = () => {
		w.current || window.matchMedia?.("(hover: hover) and (pointer: fine)").matches && b.current?.focus({ preventScroll: !0 });
	};
	V(() => {
		if (k(), !C.current) {
			C.current = !0;
			return;
		}
		f(null), m(O);
		let e = setTimeout(() => m(""), 1800);
		return () => clearTimeout(e);
	}, [O]), V(() => {
		if (e.route !== "article") {
			g(0);
			return;
		}
		let t = 0, n = () => {
			t = 0;
			let e = document.documentElement.scrollHeight - window.innerHeight;
			g(e > 0 ? Math.min(100, Math.round(window.scrollY / e * 100)) : 0);
		}, r = () => {
			t ||= requestAnimationFrame(n);
		};
		return n(), window.addEventListener("scroll", r, { passive: !0 }), () => {
			window.removeEventListener("scroll", r), cancelAnimationFrame(t);
		};
	}, [e.route, e.slug]), V(() => {
		if (!d) return;
		let e = (e) => {
			y.current?.contains(e.target) || f(null);
		};
		return document.addEventListener("pointerdown", e), () => document.removeEventListener("pointerdown", e);
	}, [d]);
	let A = _ && l ? xt(l, D) : null, j = A && !(A.hits.length === 1 && A.hits[0] === A.prefix) ? A.hits : [], M = j.length > 0 ? j : d, N = A && !A.typingCommand && A.hits.length === 1 && t.find((e) => e.slug === A.hits[0].replace(/^writing\//, ""));
	V(() => {
		N && Pe(N.slug);
	}, [N]);
	let P = () => {
		let { hits: e, head: t, typingCommand: n } = xt(l, D);
		e.length !== 0 && u(e.length === 1 ? `${t}${e[0]}${n ? " " : ""}` : t + St(e));
	};
	return /* @__PURE__ */ G("div", {
		class: E ? "term term-home" : "term",
		ref: y,
		children: [e.route === "article" && /* @__PURE__ */ G("span", {
			class: "term-progress",
			style: { width: `${h}%` }
		}), /* @__PURE__ */ G("div", {
			class: E ? "term-wrap" : "shell term-wrap",
			children: [M && /* @__PURE__ */ G("div", {
				class: "term-out",
				role: "status",
				children: M.map((e, t) => /* @__PURE__ */ G(Tt, { line: e }, t))
			}), /* @__PURE__ */ G("form", {
				class: "term-line",
				onSubmit: (e) => {
					e.preventDefault(), l.trim() && x.current.push(l.trim()), S.current = x.current.length, u(""), ee(l);
				},
				children: [
					/* @__PURE__ */ G("label", {
						class: "term-ps",
						for: "term-input",
						children: [
							/* @__PURE__ */ G("span", {
								class: "term-user",
								children: [
									"guest@",
									K.host,
									":"
								]
							}),
							/* @__PURE__ */ G("span", {
								class: "term-path",
								children: T
							}),
							/* @__PURE__ */ G("span", { children: "$" })
						]
					}),
					/* @__PURE__ */ G("input", {
						id: "term-input",
						ref: b,
						type: "text",
						value: l,
						onInput: (e) => {
							u(e.currentTarget.value), f(null);
						},
						onKeyDown: (e) => {
							if (e.key === "Escape") w.current = !0, f(null), u(""), b.current.blur();
							else if (e.key === "Tab" && l) e.preventDefault(), P();
							else if (!l && (e.key === "ArrowLeft" || e.key === "ArrowRight")) E && a(e.key === "ArrowLeft" ? -1 : 1);
							else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
								e.preventDefault();
								let t = x.current;
								S.current = Math.max(0, Math.min(t.length, S.current + (e.key === "ArrowUp" ? -1 : 1))), u(t[S.current] || "");
							}
						},
						onFocus: () => {
							w.current = !1, v(!0);
						},
						onBlur: () => v(!1),
						placeholder: p || (_ ? "type a command, or press esc for single-key shortcuts" : "press / to type a command"),
						"aria-label": "Terminal command",
						autocomplete: "off",
						autocapitalize: "off",
						autocorrect: "off",
						spellcheck: !1
					}),
					e.route === "article" && /* @__PURE__ */ G("span", {
						class: "term-pct",
						"aria-label": "Reading progress",
						children: [String(h).padStart(2, "0"), "%"]
					}),
					!E && /* @__PURE__ */ G("span", {
						class: "term-links",
						children: Ye.map(([e, t, n]) => /* @__PURE__ */ G("a", {
							href: n,
							"aria-label": t,
							title: t,
							target: n.startsWith("http") ? "_blank" : void 0,
							rel: n.startsWith("http") ? "noopener noreferrer" : void 0,
							children: /* @__PURE__ */ G(X, {
								name: e,
								size: 12
							})
						}, e))
					}),
					/* @__PURE__ */ G("span", {
						class: "term-themes",
						role: "group",
						"aria-label": "Theme",
						children: q.map((e) => /* @__PURE__ */ G("button", {
							type: "button",
							class: `sw sw-${e}`,
							"aria-pressed": e === n,
							"aria-label": `${e} theme`,
							title: `${e} theme`,
							onClick: () => r(e)
						}, e))
					}),
					/* @__PURE__ */ G("button", {
						type: "button",
						class: "term-help",
						"aria-label": "Keys and commands",
						onClick: () => f(d ? null : _t),
						children: "[?]"
					})
				]
			})]
		})]
	});
}
//#endregion
//#region docs/main.jsx
var Dt = "fo:theme";
function Ot() {
	let [e, t] = B(() => {
		let e = document.documentElement.dataset.theme;
		return q.includes(e) ? e : q[0];
	});
	return [e, Se((e) => {
		t(e), document.documentElement.dataset.theme = e;
		try {
			window.localStorage.setItem(Dt, e);
		} catch {}
	}, [])];
}
function kt() {
	let [e, t] = B([]);
	return V(() => {
		let e = new AbortController();
		return fetch("articles/index.json", { signal: e.signal }).then((e) => {
			if (!e.ok) throw Error(`index.json ${e.status}`);
			return e.json();
		}).then(t).catch((e) => {
			e.name !== "AbortError" && t([]);
		}), () => e.abort();
	}, []), e;
}
function At() {
	let [e, t = ""] = (window.location.hash || "").replace(/^#\/?/, "").split("?"), n = e.split("/").filter(Boolean);
	if (n[0] === "writing" && n[1]) return {
		route: "article",
		slug: n[1]
	};
	if (n[0] === "contact") return { route: "contact" };
	let r = new URLSearchParams(t);
	return {
		route: "home",
		topic: r.get("topic") || "",
		q: r.get("q") || "",
		page: Math.max(1, parseInt(r.get("page"), 10) || 1)
	};
}
var jt = /* @__PURE__ */ new Map(), Mt = !1;
window.history.scrollRestoration = "manual";
function $(e, t = !1) {
	e !== window.location.hash && (Mt = !0, t ? (window.history.replaceState(null, "", e), window.dispatchEvent(new Event("hashchange"))) : window.location.hash = e);
}
document.addEventListener("click", (e) => {
	if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
	let t = e.target.closest?.("a[href^=\"#/\"]");
	t && t.hash !== window.location.hash && (Mt = !0);
}, !0);
var Nt = () => typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
function Pt(e, t) {
	let n = [...document.querySelectorAll(".entries:not(.ghost) [data-entry]")];
	if (n.length === 0) {
		window.scrollBy({
			top: e * window.innerHeight * .5,
			behavior: Nt()
		});
		return;
	}
	let r = n.indexOf(document.activeElement), i = r < 0 ? e > 0 ? 0 : n.length - 1 : r + e;
	n[i] ? n[i].focus() : t(e, e > 0 ? "first" : "last");
}
function Ft() {
	let [e, t] = Ot(), n = kt(), [r, i] = B(At), a = H(null), o = H(null), s = H(window.location.hash), c = H(0), l = H("#/");
	r.route === "home" && (l.current = Y(r)), V(() => {
		let e = () => {
			jt.set(s.current, window.scrollY), s.current = window.location.hash, c.current = Mt ? 0 : jt.get(s.current) || 0, Mt = !1, i(At());
		};
		return window.addEventListener("hashchange", e), () => window.removeEventListener("hashchange", e);
	}, []), V(() => {
		window.scrollTo({
			top: c.current,
			behavior: "instant"
		});
	}, [r.route, r.slug]);
	let u = (e, t) => {
		if (r.route === "home") return o.current.turnTo(o.current.page + e, t);
		if (r.route !== "article") return !1;
		let i = n[n.findIndex((e) => e.slug === r.slug) + e];
		return i && $(J(i.slug)), !!i;
	}, d = H(null);
	return d.current = (n) => {
		if (n.defaultPrevented || n.metaKey || n.ctrlKey || n.altKey || n.target.closest?.("input, textarea, select, [contenteditable]")) return;
		let r = {
			h: () => $("#/"),
			c: () => $("#/contact"),
			t: () => t(q[(q.indexOf(e) + 1) % q.length]),
			j: () => Pt(1, u),
			k: () => Pt(-1, u),
			"[": () => u(-1),
			"]": () => u(1),
			g: () => window.scrollTo({
				top: 0,
				behavior: Nt()
			}),
			G: () => window.scrollTo({
				top: document.documentElement.scrollHeight,
				behavior: Nt()
			}),
			"/": () => a.current.focus(),
			"?": () => a.current.run("help")
		}[n.key];
		r && (n.preventDefault(), r());
	}, V(() => {
		let e = (e) => d.current(e);
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, []), /* @__PURE__ */ G(S, { children: [
		/* @__PURE__ */ G(Je, { route: r.route }),
		/* @__PURE__ */ G("main", {
			class: r.route === "home" ? "home" : "shell",
			children: r.route === "article" ? /* @__PURE__ */ G(rt, {
				slug: r.slug,
				articles: n,
				back: l.current
			}, r.slug) : r.route === "contact" ? /* @__PURE__ */ G(at, {}) : /* @__PURE__ */ G(gt, {
				articles: n,
				loc: r,
				go: $,
				pager: o
			})
		}),
		/* @__PURE__ */ G(Et, {
			loc: r,
			articles: n,
			theme: e,
			setTheme: t,
			go: $,
			step: u,
			pager: o,
			back: l.current,
			api: a
		})
	] });
}
le(/* @__PURE__ */ G(Ft, {}), document.getElementById("root")), requestAnimationFrame(() => requestAnimationFrame(() => {
	document.body.classList.remove("booting");
}));
//#endregion
