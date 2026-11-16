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
function ee(e) {
	if (e.__P && e.__d) {
		var n = e.__v, r = n.__e, i = [], a = [], o = v({}, n);
		o.__v = n.__v + 1, t.vnode && t.vnode(o), ne(e.__P, o, n, e.__n, e.__P.namespaceURI, 32 & n.__u ? [r] : null, i, r ?? w(n), !!(32 & n.__u), a), o.__v = n.__v, o.__.__k[o.__i] = o, ie(i, o, a), n.__e = n.__ = null, o.__e != r && T(o);
	}
}
function T(e) {
	if ((e = e.__) != null && e.__c != null) return e.__e = e.__c.base = null, e.__k.some(function(t) {
		if (t != null && t.__e != null) return e.__e = e.__c.base = t.__e;
	}), T(e);
}
function E(e) {
	(!e.__d && (e.__d = !0) && r.push(e) && !D.__r++ || i != t.debounceRendering) && ((i = t.debounceRendering) || a)(D);
}
function D() {
	try {
		for (var e, t = 1; r.length;) r.length > t && r.sort(o), e = r.shift(), t = r.length, ee(e);
	} finally {
		r.length = D.__r = 0;
	}
}
function te(e, t, n, r, i, a, o, s, c, l, u) {
	var d, f, p, g, _, v, y = r && r.__k || h, b = t.length;
	for (c = O(n, t, y, c, b), d = 0; d < b; d++) (p = n.__k[d]) != null && (f = p.__i != -1 && y[p.__i] || m, p.__i = d, v = ne(e, p, f, i, a, o, s, c, l, u), g = p.__e, p.ref && f.ref != p.ref && (f.ref && se(f.ref, null, p), u.push(p.ref, p.__c || g, p)), _ == null && g != null && (_ = g), 4 & p.__u ? (c = k(p, c, e), f.__e &&= null) : typeof p.type == "function" && v !== void 0 ? c = v : g && (c = g.nextSibling), p.__u &= -7);
	return n.__e = _, c;
}
function O(e, t, n, r, i) {
	var a, o, s, c, l, u = n.length, d = u, f = 0;
	for (e.__k = Array(i), a = 0; a < i; a++) (o = t[a]) != null && typeof o != "boolean" && typeof o != "function" ? (typeof o == "string" || typeof o == "number" || typeof o == "bigint" || o.constructor == String ? o = e.__k[a] = x(null, o, null, null, null) : _(o) ? o = e.__k[a] = x(S, { children: o }, null, null, null) : o.constructor === void 0 && o.__b > 0 ? o = e.__k[a] = x(o.type, o.props, o.key, o.ref ? o.ref : null, o.__v) : e.__k[a] = o, c = a + f, o.__ = e, o.__b = e.__b + 1, s = null, (l = o.__i = A(o, n, c, d)) != -1 && (d--, (s = n[l]) && (s.__u |= 2)), s == null || s.__v == null ? (l == -1 && (i > u ? f-- : i < u && f++), typeof o.type != "function" && (o.__u |= 4)) : l != c && (l == c - 1 ? f-- : l == c + 1 ? f++ : (l > c ? f-- : f++, o.__u |= 4))) : e.__k[a] = null;
	if (d) for (a = 0; a < u; a++) (s = n[a]) != null && !(2 & s.__u) && (s.__e == r && (r = w(s)), ce(s, s));
	return r;
}
function k(e, t, n) {
	var r, i;
	if (typeof e.type == "function") {
		for (r = e.__k, i = 0; r && i < r.length; i++) r[i] && (r[i].__ = e, t = k(r[i], t, n));
		return t;
	}
	e.__e != t && (t && e.type && !t.parentNode && (t = w(e)), t = n.insertBefore(e.__e, t || null));
	do
		t &&= t.nextSibling;
	while (t != null && t.nodeType == 8);
	return t;
}
function A(e, t, n, r) {
	var i, a, o, s = e.key, c = e.type, l = t[n], u = l != null && (2 & l.__u) == 0;
	if (l === null && s == null || u && s == l.key && c == l.type) return n;
	if (r > +!!u) {
		for (i = n - 1, a = n + 1; i >= 0 || a < t.length;) if ((l = t[o = i >= 0 ? i-- : a++]) != null && !(2 & l.__u) && s == l.key && c == l.type) return o;
	}
	return -1;
}
function j(e, t, n) {
	t[0] == "-" ? e.setProperty(t, n ?? "") : e[t] = n == null ? "" : typeof n != "number" || g.test(t) ? n : n + "px";
}
function M(e, t, n, r, i) {
	var a, o;
	n: if (t == "style") if (typeof n == "string") e.style.cssText = n;
	else {
		if (typeof r == "string" && (e.style.cssText = r = ""), r) for (t in r) n && t in n || j(e.style, t, "");
		if (n) for (t in n) r && n[t] == r[t] || j(e.style, t, n[t]);
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
function N(e) {
	return function(n) {
		if (this.l) {
			var r = this.l[n.type + e];
			if (n[c] == null) n[c] = d++;
			else if (n[c] < r[l]) return;
			return r(t.event ? t.event(n) : n);
		}
	};
}
function ne(e, n, r, i, a, o, s, c, l, u) {
	var d, f, p, m, g, b, x, ee, T, E, D, O, k, A, j, M, N = n.type;
	if (n.constructor !== void 0) return null;
	128 & r.__u && (l = !!(32 & r.__u), o = [c = n.__e = r.__e]), (d = t.__b) && d(n);
	n: if (typeof N == "function") {
		f = s.length;
		try {
			if (T = n.props, E = N.prototype && N.prototype.render, D = (d = N.contextType) && i[d.__c], O = d ? D ? D.props.value : d.__ : i, r.__c ? ee = (p = n.__c = r.__c).__ = p.__E : (E ? n.__c = p = new N(T, O) : (n.__c = p = new C(T, O), p.constructor = N, p.render = le), D && D.sub(p), p.state ||= {}, p.__n = i, m = p.__d = !0, p.__h = [], p._sb = []), E && p.__s == null && (p.__s = p.state), E && N.getDerivedStateFromProps != null && (p.__s == p.state && (p.__s = v({}, p.__s)), v(p.__s, N.getDerivedStateFromProps(T, p.__s))), g = p.props, b = p.state, p.__v = n, m) E && N.getDerivedStateFromProps == null && p.componentWillMount != null && p.componentWillMount(), E && p.componentDidMount != null && p.__h.push(p.componentDidMount);
			else {
				if (E && N.getDerivedStateFromProps == null && T !== g && p.componentWillReceiveProps != null && p.componentWillReceiveProps(T, O), n.__v == r.__v || !p.__e && p.shouldComponentUpdate != null && !1 === p.shouldComponentUpdate(T, p.__s, O)) {
					n.__v != r.__v && (p.props = T, p.state = p.__s, p.__d = !1), n.__e = r.__e, n.__k = r.__k, n.__k.some(function(e) {
						e && (e.__ = n);
					}), h.push.apply(p.__h, p._sb), p._sb = [], p.__h.length && s.push(p), c = w(r);
					break n;
				}
				p.componentWillUpdate != null && p.componentWillUpdate(T, p.__s, O), E && p.componentDidUpdate != null && p.__h.push(function() {
					p.componentDidUpdate(g, b, x);
				});
			}
			if (p.context = O, p.props = T, p.__P = e, p.__e = !1, k = t.__r, A = 0, E) p.state = p.__s, p.__d = !1, k && k(n), d = p.render(p.props, p.state, p.context), h.push.apply(p.__h, p._sb), p._sb = [];
			else do
				p.__d = !1, k && k(n), d = p.render(p.props, p.state, p.context), p.state = p.__s;
			while (p.__d && ++A < 25);
			p.state = p.__s, p.getChildContext != null && (i = v(v({}, i), p.getChildContext())), E && !m && p.getSnapshotBeforeUpdate != null && (x = p.getSnapshotBeforeUpdate(g, b)), j = d != null && d.type === S && d.key == null ? ae(d.props.children) : d, c = te(e, _(j) ? j : [j], n, r, i, a, o, s, c, l, u), p.base = n.__e, n.__u &= -161, p.__h.length && s.push(p), ee && (p.__E = p.__ = null);
		} catch (e) {
			if (s.length = f, n.__v = null, l || o != null) {
				if (e.then) {
					for (n.__u |= l ? 160 : 128; c && c.nodeType == 8 && c.nextSibling;) c = c.nextSibling;
					o != null && (o[o.indexOf(c)] = null), n.__e = c;
				} else if (o != null) for (M = o.length; M--;) y(o[M]);
			} else n.__e = r.__e;
			n.__k ??= r.__k || [], e.then || re(n), t.__e(e, n, r);
		}
	} else o == null && n.__v == r.__v ? (n.__k = r.__k, n.__e = r.__e) : c = n.__e = oe(r.__e, n, r, i, a, o, s, l, u);
	return (d = t.diffed) && d(n), 128 & n.__u ? void 0 : c;
}
function re(e) {
	e && (e.__c && (e.__c.__e = !0), e.__k && e.__k.some(re));
}
function ie(e, n, r) {
	for (var i = 0; i < r.length; i++) se(r[i], r[++i], r[++i]);
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
function ae(e) {
	return typeof e != "object" || !e || e.__b > 0 ? e : _(e) ? e.map(ae) : e.constructor === void 0 ? v({}, e) : null;
}
function oe(n, r, i, a, o, s, c, l, u) {
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
		for (d in x) g = x[d], d == "dangerouslySetInnerHTML" ? p = g : d == "children" || d in S || d == "value" && "defaultValue" in S || d == "checked" && "defaultChecked" in S || M(n, d, null, g, o);
		for (d in S) g = S[d], d == "children" ? h = g : d == "dangerouslySetInnerHTML" ? f = g : d == "value" ? v = g : d == "checked" ? b = g : l && typeof g != "function" || x[d] === g || M(n, d, g, x[d], o);
		if (f) l || p && (f.__html == p.__html || f.__html == n.innerHTML) || (n.innerHTML = f.__html), r.__k = [];
		else if (p && (n.innerHTML = ""), te(r.type == "template" ? n.content : n, _(h) ? h : [h], r, i, a, C == "foreignObject" ? "http://www.w3.org/1999/xhtml" : o, s, c, s ? s[0] : i.__k && w(i, 0), l, u), s != null) for (d = s.length; d--;) y(s[d]);
		l && C != "textarea" || (d = "value", C == "progress" && v == null ? n.removeAttribute("value") : v != null && (v !== n[d] || C == "progress" && !v || C == "option" && v != x[d]) && M(n, d, v, x[d], o), d = "checked", b != null && b != n[d] && M(n, d, b, x[d], o));
	}
	return n;
}
function se(e, n, r) {
	try {
		if (typeof e == "function") {
			var i = typeof e.__u == "function";
			i && e.__u(), i && n == null || (e.__u = e(n));
		} else e.current = n;
	} catch (e) {
		t.__e(e, r);
	}
}
function ce(e, n, r) {
	var i, a;
	if (t.unmount && t.unmount(e), (i = e.ref) && (i.current && i.current != e.__e || se(i, null, n)), (i = e.__c) != null) {
		if (i.componentWillUnmount) try {
			i.componentWillUnmount();
		} catch (e) {
			t.__e(e, n);
		}
		i.base = i.__P = i.__n = null;
	}
	if (i = e.__k) for (a = 0; a < i.length; a++) i[a] && ce(i[a], n, r || typeof e.type != "function");
	r || y(e.__e), e.__c = e.__ = e.__e = void 0;
}
function le(e, t, n) {
	return this.constructor(e, n);
}
function ue(n, r, i) {
	var a, o, s, c;
	r == document && (r = document.documentElement), t.__ && t.__(n, r), o = (a = typeof i == "function") ? null : i && i.__k || r.__k, s = [], c = [], ne(r, n = (!a && i || r).__k = b(S, null, [n]), o || m, m, r.namespaceURI, !a && i ? [i] : o ? null : r.firstChild ? e.call(r.childNodes) : null, s, !a && i ? i : o ? o.__e : r.firstChild, a, c), ie(s, n, c), n.props.children = null;
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
	typeof e == "function" && (e = e(v({}, n), this.props)), e && v(n, e), e != null && this.__v && (t && this._sb.push(t), E(this));
}, C.prototype.forceUpdate = function(e) {
	this.__v && (this.__e = !0, e && this.__h.push(e), E(this));
}, C.prototype.render = S, r = [], a = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, o = function(e, t) {
	return e.__v.__b - t.__v.__b;
}, D.__r = 0, s = Math.random().toString(8), c = "__d" + s, l = "__a" + s, u = /(PointerCapture)$|Capture$/i, d = 0, f = N(!1), p = N(!0);
//#endregion
//#region node_modules/preact/hooks/dist/hooks.module.js
var P, F, I, de, L = 0, fe = [], R = t, pe = R.__b, me = R.__r, he = R.diffed, ge = R.__c, _e = R.unmount, ve = R.__;
function z(e, t) {
	R.__h && R.__h(F, e, L || t), L = 0;
	var n = F.__H ||= {
		__: [],
		__h: []
	};
	return e >= n.__.length && n.__.push({}), n.__[e];
}
function B(e) {
	return L = 1, ye(De, e);
}
function ye(e, t, n) {
	var r = z(P++, 2);
	if (r.t = e, !r.__c && (r.__ = [n ? n(t) : De(void 0, t), function(e) {
		var t = r.__N ? r.__N[0] : r.__[0], n = r.t(t, e);
		t !== n && (r.__N = [n, r.__[1]], r.__c.setState({}));
	}], r.__c = F, !F.__f)) {
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
		F.__f = !0;
		var a = F.shouldComponentUpdate, o = F.componentWillUpdate;
		F.componentWillUpdate = function(e, t, n) {
			if (this.__e) {
				var r = a;
				a = void 0, i(e, t, n), a = r;
			}
			o && o.call(this, e, t, n);
		}, F.shouldComponentUpdate = i;
	}
	return r.__N || r.__;
}
function V(e, t) {
	var n = z(P++, 3);
	!R.__s && Ee(n.__H, t) && (n.__ = e, n.u = t, F.__H.__h.push(n));
}
function H(e) {
	return L = 5, be(function() {
		return { current: e };
	}, []);
}
function be(e, t) {
	var n = z(P++, 7);
	return Ee(n.__H, t) && (n.__ = e(), n.__H = t, n.__h = e), n.__;
}
function xe(e, t) {
	return L = 8, be(function() {
		return e;
	}, t);
}
function Se() {
	for (var e; e = fe.shift();) {
		var t = e.__H;
		if (e.__P && t) try {
			t.__h.some(U), t.__h.some(Te), t.__h = [];
		} catch (n) {
			t.__h = [], R.__e(n, e.__v);
		}
	}
}
R.__b = function(e) {
	F = null, pe && pe(e);
}, R.__ = function(e, t) {
	e && t.__k && t.__k.__m && (e.__m = t.__k.__m), ve && ve(e, t);
}, R.__r = function(e) {
	me && me(e), P = 0;
	var t = (F = e.__c).__H;
	t && (I === F ? (t.__h = [], F.__h = [], t.__.some(function(e) {
		e.__N && (e.__ = e.__N), e.u = e.__N = void 0;
	})) : (t.__h.some(U), t.__h.some(Te), t.__h = [], P = 0)), I = F;
}, R.diffed = function(e) {
	he && he(e);
	var t = e.__c;
	t && t.__H && (t.__H.__h.length && (fe.push(t) !== 1 && de === R.requestAnimationFrame || ((de = R.requestAnimationFrame) || we)(Se)), t.__H.__.some(function(e) {
		e.u &&= (e.__H = e.u, void 0);
	})), I = F = null;
}, R.__c = function(e, t) {
	t.some(function(e) {
		try {
			e.__h.some(U), e.__h = e.__h.filter(function(e) {
				return !e.__ || Te(e);
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
var Ce = typeof requestAnimationFrame == "function";
function we(e) {
	var t, n = function() {
		clearTimeout(r), Ce && cancelAnimationFrame(t), setTimeout(e);
	}, r = setTimeout(n, 35);
	Ce && (t = requestAnimationFrame(n));
}
function U(e) {
	var t = F, n = e.__c;
	typeof n == "function" && (e.__c = void 0, n()), F = t;
}
function Te(e) {
	var t = F;
	e.__c = e.__(), F = t;
}
function Ee(e, t) {
	return !e || e.length !== t.length || t.some(function(t, n) {
		return t !== e[n];
	});
}
function De(e, t) {
	return typeof t == "function" ? t(e) : t;
}
//#endregion
//#region docs/icons.js
var Oe = {
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
}, ke = {};
function Ae(e, t) {
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
function je(e) {
	if (!ke[e]) {
		let t = (Oe[e] || Oe.file).trim().split("\n");
		ke[e] = [Ae(t, "#"), Ae(t, "@")];
	}
	return ke[e];
}
//#endregion
//#region node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js
var Me = 0;
Array.isArray;
function W(e, n, r, i, a, o) {
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
		__v: --Me,
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
var G = {
	name: "Francesco Orozco",
	role: "AI Engineer & Data Scientist",
	company: "Bloom Growth",
	host: "thatai.dev",
	email: "franccesco@thatai.dev",
	github: "github.com/franccesco",
	twitter: "@__franccesco",
	linkedin: "linkedin.com/in/franccesco"
}, K = [
	"dark",
	"light",
	"cream"
], q = [
	"data",
	"python",
	"ruby",
	"web",
	"tools"
], Ne = [
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
function Pe(e) {
	let t = /^(\d{4})-(\d{2})-(\d{2})/.exec(e || "");
	return t ? `${Ne[t[2] - 1]} ${t[3]}, ${t[1]}` : e || "";
}
var J = (e) => `#/writing/${e}`;
function Y({ name: e, size: t = 24 }) {
	let [n, r] = je(e);
	return /* @__PURE__ */ W("svg", {
		class: "px",
		viewBox: "0 0 12 12",
		width: t,
		height: t,
		"shape-rendering": "crispEdges",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ W("path", {
			d: n,
			fill: "currentColor"
		}), r && /* @__PURE__ */ W("path", {
			class: "px-accent",
			d: r
		})]
	});
}
function X({ children: e }) {
	return /* @__PURE__ */ W("span", {
		class: "k",
		"aria-hidden": "true",
		children: [
			"[",
			e,
			"]"
		]
	});
}
var Fe = [
	[
		"home",
		"H",
		"#/"
	],
	[
		"writing",
		"W",
		"#/writing"
	],
	[
		"contact",
		"C",
		"#/contact"
	]
];
function Ie({ route: e }) {
	let t = e === "article" ? "writing" : e;
	return /* @__PURE__ */ W("header", {
		class: "top cols rule-below",
		children: [/* @__PURE__ */ W("a", {
			class: "brand",
			href: "#/",
			children: [
				/* @__PURE__ */ W("span", {
					class: "mono-f",
					"aria-hidden": "true",
					children: "f"
				}),
				/* @__PURE__ */ W("span", {
					class: "mono-dot",
					"aria-hidden": "true"
				}),
				/* @__PURE__ */ W("span", {
					class: "brand-name",
					children: G.name
				})
			]
		}), /* @__PURE__ */ W("nav", {
			class: "nav",
			"aria-label": "Main",
			children: Fe.map(([e, n, r]) => /* @__PURE__ */ W("a", {
				href: r,
				class: t === e ? "on" : "",
				"aria-current": t === e ? "page" : void 0,
				children: [
					/* @__PURE__ */ W(X, { children: n }),
					" ",
					/* @__PURE__ */ W("span", { children: e })
				]
			}, e))
		})]
	});
}
function Le() {
	let e = [
		[
			"mail",
			"Email",
			`mailto:${G.email}`
		],
		[
			"git",
			"GitHub",
			`https://${G.github}`
		],
		[
			"linkedin",
			"LinkedIn",
			`https://${G.linkedin}`
		],
		[
			"x",
			"X",
			`https://twitter.com/${G.twitter.replace("@", "")}`
		]
	];
	return /* @__PURE__ */ W("footer", {
		class: "foot",
		children: [/* @__PURE__ */ W("span", { children: ["© 2026 ", G.name] }), /* @__PURE__ */ W("span", {
			class: "foot-links",
			children: e.map(([e, t, n]) => /* @__PURE__ */ W("a", {
				href: n,
				"aria-label": t,
				title: t,
				target: n.startsWith("http") ? "_blank" : void 0,
				rel: n.startsWith("http") ? "noopener noreferrer" : void 0,
				children: /* @__PURE__ */ W(Y, {
					name: e,
					size: 24
				})
			}, e))
		})]
	});
}
function Re({ article: e }) {
	return /* @__PURE__ */ W("a", {
		class: "entry",
		"data-entry": !0,
		href: J(e.slug),
		children: [
			/* @__PURE__ */ W(Y, { name: e.icon }),
			/* @__PURE__ */ W("span", {
				class: "entry-date",
				children: Pe(e.date)
			}),
			/* @__PURE__ */ W("span", {
				class: "entry-title",
				children: /* @__PURE__ */ W("span", {
					class: "hl",
					children: e.title
				})
			}),
			/* @__PURE__ */ W("span", {
				class: "entry-min",
				children: [e.minutes, " min"]
			})
		]
	});
}
function ze({ article: e }) {
	return /* @__PURE__ */ W("a", {
		class: "feat",
		"data-entry": !0,
		href: J(e.slug),
		children: [/* @__PURE__ */ W("span", {
			class: "tile",
			children: /* @__PURE__ */ W(Y, {
				name: e.icon,
				size: 72
			})
		}), /* @__PURE__ */ W("span", {
			class: "feat-body",
			children: [
				/* @__PURE__ */ W("span", {
					class: "chips",
					children: [
						/* @__PURE__ */ W("span", {
							class: "chip chip-on",
							children: "Latest"
						}),
						/* @__PURE__ */ W("span", {
							class: "chip",
							children: e.topic
						}),
						/* @__PURE__ */ W("span", {
							class: "feat-min",
							children: [e.minutes, " min"]
						})
					]
				}),
				/* @__PURE__ */ W("span", {
					class: "feat-title",
					children: e.title
				}),
				/* @__PURE__ */ W("span", {
					class: "feat-dek",
					children: e.description
				}),
				/* @__PURE__ */ W("span", {
					class: "feat-date",
					children: Pe(e.date)
				})
			]
		})]
	});
}
function Be({ articles: e, featureFirst: t = !1 }) {
	let [n, ...r] = e;
	return n ? /* @__PURE__ */ W("div", {
		class: "entries",
		children: [W(t ? ze : Re, { article: n }), r.map((e) => /* @__PURE__ */ W(Re, { article: e }, e.slug))]
	}) : null;
}
//#endregion
//#region docs/Article.jsx
var Ve = 140, He = () => typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function Ue({ items: e, active: t }) {
	if (e.length === 0) return null;
	let n = (e, t) => {
		e.preventDefault(), document.getElementById(t)?.scrollIntoView({ behavior: He() ? "auto" : "smooth" });
	};
	return /* @__PURE__ */ W("nav", {
		class: "tree",
		"aria-label": "Contents",
		children: [/* @__PURE__ */ W("h2", {
			class: "label",
			children: "Tree"
		}), e.map((e) => /* @__PURE__ */ W("a", {
			href: `#${e.id}`,
			onClick: (t) => n(t, e.id),
			class: `${e.sub ? "sub" : ""}${e.id === t ? " on" : ""}`,
			children: e.text
		}, e.id))]
	});
}
function We({ newer: e, older: t }) {
	return !e && !t ? null : /* @__PURE__ */ W("nav", {
		class: "pager",
		"aria-label": "More writing",
		children: [e ? /* @__PURE__ */ W("a", {
			href: J(e.slug),
			children: [/* @__PURE__ */ W("span", {
				class: "pager-dir",
				children: [/* @__PURE__ */ W(X, { children: "[" }), " Newer"]
			}), /* @__PURE__ */ W("span", { children: e.title })]
		}) : /* @__PURE__ */ W("span", {}), t ? /* @__PURE__ */ W("a", {
			class: "pager-next",
			href: J(t.slug),
			children: [/* @__PURE__ */ W("span", {
				class: "pager-dir",
				children: ["Older ", /* @__PURE__ */ W(X, { children: "]" })]
			}), /* @__PURE__ */ W("span", { children: t.title })]
		}) : /* @__PURE__ */ W("span", {})]
	});
}
function Ge({ slug: e, articles: t }) {
	let [n, r] = B(null), [i, a] = B(null), [o, s] = B([]), [c, l] = B(""), [u, d] = B(!1), f = H(null), p = H(null), m = H(null), h = t.findIndex((t) => t.slug === e), g = t[h];
	return V(() => {
		let t = !1;
		return r(null), a(null), s([]), Promise.all([fetch(`articles/${e}.md`).then((e) => e.ok ? e.text() : Promise.reject(/* @__PURE__ */ Error(`HTTP ${e.status}`))), import("./chunks/markdown-BvJZH8t1.js")]).then(([e, n]) => {
			t || (m.current = n.highlight, r(n.render(e)));
		}).catch((e) => {
			t || a(e.message);
		}), () => {
			t = !0;
		};
	}, [e]), V(() => {
		if (typeof IntersectionObserver != "function") return;
		let e = new IntersectionObserver(([e]) => d(!e.isIntersecting));
		return e.observe(p.current), () => e.disconnect();
	}, []), V(() => {
		if (!n || !f.current) return;
		m.current?.(f.current);
		let e = [...f.current.querySelectorAll("h2, h3")];
		e.forEach((e, t) => {
			e.id = `s${t}`;
		}), s(e.map((e) => ({
			id: e.id,
			text: e.textContent,
			sub: e.tagName === "H3"
		})));
		let t = 0, r = () => {
			t = 0;
			let n = "";
			for (let t of e) {
				if (t.getBoundingClientRect().top > Ve) break;
				n = t.id;
			}
			l(n);
		}, i = () => {
			t ||= requestAnimationFrame(r);
		};
		return r(), window.addEventListener("scroll", i, { passive: !0 }), () => {
			window.removeEventListener("scroll", i), cancelAnimationFrame(t);
		};
	}, [n]), /* @__PURE__ */ W("article", {
		class: "cols page",
		children: [/* @__PURE__ */ W("aside", {
			class: "side art-side",
			children: [
				/* @__PURE__ */ W("a", {
					class: "back",
					href: "#/writing",
					children: "← ../writing"
				}),
				/* @__PURE__ */ W("div", {
					class: "art-facts",
					children: [/* @__PURE__ */ W("div", {
						class: `art-id${u ? " docked" : ""}`,
						children: [/* @__PURE__ */ W("span", {
							class: "tile",
							children: /* @__PURE__ */ W(Y, {
								name: g?.icon || "file",
								size: 72
							})
						}), /* @__PURE__ */ W("a", {
							class: "art-id-title",
							href: "#/",
							"aria-hidden": "true",
							tabindex: -1,
							onClick: (e) => {
								e.preventDefault(), window.scrollTo({
									top: 0,
									behavior: He() ? "auto" : "smooth"
								});
							},
							children: g ? g.title : e
						})]
					}), g && /* @__PURE__ */ W("dl", {
						class: "meta",
						children: [
							/* @__PURE__ */ W("div", { children: [/* @__PURE__ */ W("dt", { children: "published" }), /* @__PURE__ */ W("dd", { children: Pe(g.date) })] }),
							/* @__PURE__ */ W("div", { children: [/* @__PURE__ */ W("dt", { children: "topic" }), /* @__PURE__ */ W("dd", { children: /* @__PURE__ */ W("a", {
								href: `#/writing?topic=${g.topic}`,
								children: g.topic
							}) })] }),
							/* @__PURE__ */ W("div", { children: [/* @__PURE__ */ W("dt", { children: "reading time" }), /* @__PURE__ */ W("dd", { children: [g.minutes, " min"] })] })
						]
					})]
				}),
				/* @__PURE__ */ W(Ue, {
					items: o,
					active: c
				})
			]
		}), /* @__PURE__ */ W("div", {
			class: "main",
			children: [
				/* @__PURE__ */ W("h1", {
					ref: p,
					class: "art-title",
					children: g ? g.title : e
				}),
				g?.description && /* @__PURE__ */ W("p", {
					class: "art-dek",
					children: g.description
				}),
				/* @__PURE__ */ W("div", {
					class: "art-main",
					children: [
						i && /* @__PURE__ */ W("p", {
							class: "status",
							children: [
								"Couldn’t load this essay: ",
								/* @__PURE__ */ W("code", { children: i }),
								"."
							]
						}),
						!i && !n && /* @__PURE__ */ W("p", {
							class: "status",
							children: "Loading…"
						}),
						n && /* @__PURE__ */ W("div", {
							ref: f,
							class: "article-body",
							dangerouslySetInnerHTML: { __html: n }
						}),
						n && /* @__PURE__ */ W(We, {
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
function Z({ icon: e, label: t, value: n, href: r, copyable: i = !1 }) {
	let [a, o] = B(!1), s = r.startsWith("http");
	return /* @__PURE__ */ W("div", {
		class: "crow",
		children: [
			/* @__PURE__ */ W(Y, { name: e }),
			/* @__PURE__ */ W("span", {
				class: "crow-label",
				children: t
			}),
			/* @__PURE__ */ W("a", {
				href: r,
				target: s ? "_blank" : void 0,
				rel: s ? "noopener noreferrer" : void 0,
				children: [n, s && " ↗"]
			}),
			i && /* @__PURE__ */ W("button", {
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
function Ke() {
	return /* @__PURE__ */ W("div", {
		class: "cols page",
		children: [/* @__PURE__ */ W("aside", {
			class: "side",
			children: [/* @__PURE__ */ W("h1", {
				class: "page-title",
				children: "Say hi."
			}), /* @__PURE__ */ W("p", {
				class: "lede",
				children: "Easiest way to reach me is email — I usually reply within a day or two."
			})]
		}), /* @__PURE__ */ W("div", {
			class: "main",
			children: [/* @__PURE__ */ W("section", { children: [/* @__PURE__ */ W("h2", {
				class: "label",
				children: "Channels"
			}), /* @__PURE__ */ W("div", {
				class: "crows",
				children: [
					/* @__PURE__ */ W(Z, {
						icon: "mail",
						label: "Email",
						value: G.email,
						href: `mailto:${G.email}`,
						copyable: !0
					}),
					/* @__PURE__ */ W(Z, {
						icon: "git",
						label: "GitHub",
						value: G.github,
						href: `https://${G.github}`
					}),
					/* @__PURE__ */ W(Z, {
						icon: "linkedin",
						label: "LinkedIn",
						value: G.linkedin,
						href: `https://${G.linkedin}`
					}),
					/* @__PURE__ */ W(Z, {
						icon: "x",
						label: "Twitter / X",
						value: G.twitter,
						href: `https://twitter.com/${G.twitter.replace("@", "")}`
					})
				]
			})] }), /* @__PURE__ */ W("section", {
				class: "avail",
				children: [/* @__PURE__ */ W("span", {
					class: "avail-dot",
					"aria-hidden": "true"
				}), /* @__PURE__ */ W("div", { children: [/* @__PURE__ */ W("p", { children: [
					/* @__PURE__ */ W("strong", { children: "At Bloom Growth full-time." }),
					" ",
					"Not looking for new roles — but always open to a conversation about ",
					/* @__PURE__ */ W("em", { children: "Scout" }),
					", agent design, evals, or the data underneath any of it."
				] }), /* @__PURE__ */ W("p", {
					class: "stamp",
					children: "Last updated · May 2026"
				})] })]
			})]
		})]
	});
}
//#endregion
//#region docs/Landing.jsx
function qe() {
	return /* @__PURE__ */ W("img", {
		class: "portrait",
		src: "assets/portrait-320.webp",
		srcset: "assets/portrait-320.webp 320w, assets/portrait-400.webp 400w, assets/portrait-640.webp 640w",
		sizes: "(max-width: 820px) 104px, 200px",
		width: "200",
		height: "250",
		decoding: "async",
		alt: G.name
	});
}
function Je({ when: e, role: t, where: n, note: r }) {
	return /* @__PURE__ */ W("div", {
		class: "work",
		children: [
			/* @__PURE__ */ W(Y, { name: "case" }),
			/* @__PURE__ */ W("span", {
				class: "work-when",
				children: e
			}),
			/* @__PURE__ */ W("div", { children: [/* @__PURE__ */ W("div", {
				class: "work-role",
				children: [
					t,
					" ",
					/* @__PURE__ */ W("span", {
						class: "work-where",
						children: ["· ", n]
					})
				]
			}), /* @__PURE__ */ W("p", {
				class: "work-note",
				children: r
			})] })
		]
	});
}
function Ye({ articles: e }) {
	return /* @__PURE__ */ W("div", {
		class: "cols page",
		children: [/* @__PURE__ */ W("aside", {
			class: "side side-home",
			children: [/* @__PURE__ */ W("div", { children: [/* @__PURE__ */ W("h1", {
				class: "page-title",
				children: G.name
			}), /* @__PURE__ */ W("p", {
				class: "lede",
				children: [
					G.role,
					" at ",
					G.company,
					"."
				]
			})] }), /* @__PURE__ */ W(qe, {})]
		}), /* @__PURE__ */ W("div", {
			class: "main",
			children: [
				/* @__PURE__ */ W("section", { children: [
					/* @__PURE__ */ W("h2", {
						class: "label",
						children: "About"
					}),
					/* @__PURE__ */ W("p", {
						class: "bio",
						children: [
							"I build ",
							/* @__PURE__ */ W("em", {
								class: "serif",
								children: "agentic systems"
							}),
							" for complex problems. Right now that’s ",
							/* @__PURE__ */ W("em", { children: "Scout" }),
							" — an agent at ",
							/* @__PURE__ */ W("strong", { children: "Bloom Growth" }),
							" people can delegate their work to, 24/7. Before agents, a few years on the data underneath: pipelines, models, and the decisions that run on top."
						]
					}),
					/* @__PURE__ */ W("a", {
						class: "btn",
						href: "#/contact",
						children: [
							/* @__PURE__ */ W("span", {
								class: "btn-dot",
								"aria-hidden": "true"
							}),
							"Let’s connect",
							/* @__PURE__ */ W("span", {
								"aria-hidden": "true",
								children: "→"
							})
						]
					})
				] }),
				/* @__PURE__ */ W("section", { children: [/* @__PURE__ */ W("div", {
					class: "label-row",
					children: [/* @__PURE__ */ W("h2", {
						class: "label",
						children: "Recent writing"
					}), e.length > 0 && /* @__PURE__ */ W("a", {
						class: "more",
						href: "#/writing",
						children: [
							"All ",
							e.length,
							" entries →"
						]
					})]
				}), /* @__PURE__ */ W(Be, {
					articles: e.slice(0, 5),
					featureFirst: !0
				})] }),
				/* @__PURE__ */ W("section", { children: [
					/* @__PURE__ */ W("h2", {
						class: "label",
						children: "What I’ve worked on"
					}),
					/* @__PURE__ */ W("p", {
						class: "note",
						children: "Mostly behind the scenes — work for companies, not personal projects. Happy to talk about any of it."
					}),
					/* @__PURE__ */ W(Je, {
						when: "2019 — now",
						role: "Data Scientist & AI Engineer",
						where: "Bloom Growth",
						note: "Started in analytics and machine learning — pulling insight out of product data, unifying databanks across platforms. Grew into running the AI project cycle end-to-end and modernizing how we collect, store, and catalogue data. Most of my time now goes to Scout and the agent stack around it."
					}),
					/* @__PURE__ */ W(Je, {
						when: "2022",
						role: "Customer Data Scientist",
						where: "Deepnote · 4 mos",
						note: "A short stint helping customers evaluate and adopt Deepnote — practical product demos, plus notebook templates for prospective teams."
					})
				] })
			]
		})]
	});
}
//#endregion
//#region docs/Terminal.jsx
var Xe = [
	"# keys",
	["h  w  c", "home, writing, contact"],
	["j  k", "next / previous entry; scrolls inside an article"],
	["enter", "open the selected entry"],
	["[  ]", "newer / older article"],
	["g  G", "top / bottom of the page"],
	["t", "next theme"],
	["/", "focus this prompt"],
	["esc", "leave the prompt"],
	"# commands",
	["ls [topic]", `list writing: ${q.join(", ")}`],
	["grep <text>", "search titles and descriptions"],
	["open <slug>", "open an article; tab completes"],
	["cd <path>", "cd writing, cd contact, cd .., cd ~"],
	["theme [name]", K.join(", ")],
	["next, prev", "older / newer article"],
	["whoami, email", "who runs this site, and how to reach them"],
	["top, clear", "scroll to top, clear this output"]
], Q = {
	help: () => Xe,
	ls: (e, { go: t }) => e && !q.includes(e) ? [`ls: no topic "${e}". Topics: ${q.join(", ")}.`] : t(e ? `#/writing?topic=${e}` : "#/writing"),
	grep: (e, { go: t }) => e ? t(`#/writing?q=${encodeURIComponent(e)}`) : ["usage: grep <text>"],
	open: (e, { go: t, articles: n }) => {
		if (!e) return ["usage: open <slug>"];
		let r = e.toLowerCase(), i = n.find((e) => e.slug === r), a = i ? [i] : n.filter((e) => e.slug.includes(r) || e.title.toLowerCase().includes(r));
		return a.length === 0 ? [`open: nothing matches "${e}"`] : t(a.length === 1 ? J(a[0].slug) : `#/writing?q=${encodeURIComponent(e)}`);
	},
	cd: (e, t) => {
		let n = e.replace(/^(~|\.)?\/+/, "").replace(/\/+$/, "");
		if (!n || n === "~") return t.go("#/");
		if (n === "..") return t.go(t.loc.route === "article" ? "#/writing" : "#/");
		if (n === "writing" || n === "contact") return t.go(`#/${n}`);
		let r = n.replace(/^writing\//, "");
		return t.articles.some((e) => e.slug === r) ? t.go(J(r)) : [`cd: no such path: ${e}`];
	},
	theme: (e, { theme: t, setTheme: n }) => {
		if (e && !K.includes(e)) return [`theme: choose one of ${K.join(", ")}`];
		let r = e || K[(K.indexOf(t) + 1) % K.length];
		return n(r), [`theme: ${r}`];
	},
	next: (e, { step: t }) => t(1),
	prev: (e, { step: t }) => t(-1),
	top: () => window.scrollTo({ top: 0 }),
	home: (e, { go: t }) => t("#/"),
	writing: (e, { go: t }) => t("#/writing"),
	contact: (e, { go: t }) => t("#/contact"),
	pwd: (e, { path: t }) => [t],
	whoami: () => [`${G.name} — ${G.role} at ${G.company}.`, "You are guest. Type contact to change that."],
	email: () => [{
		text: G.email,
		href: `mailto:${G.email}`
	}],
	clear: () => void 0
};
Q.cat = Q.open;
function Ze(e, { articles: t }) {
	let n = t.map((e) => e.slug);
	return e === "ls" ? q : e === "theme" ? K : e === "open" || e === "cat" ? n : e === "cd" ? [
		"writing",
		"contact",
		"..",
		"~",
		...n.map((e) => `writing/${e}`)
	] : [];
}
function Qe(e) {
	let t = e[0];
	for (let n of e) for (; !n.startsWith(t);) t = t.slice(0, -1);
	return t;
}
function $e(e) {
	return e.route === "home" ? "~" : e.route === "article" ? `~/writing/${e.slug}` : `~/${e.route}`;
}
function et({ line: e }) {
	return Array.isArray(e) ? /* @__PURE__ */ W("div", {
		class: "term-pair",
		children: [/* @__PURE__ */ W("span", { children: e[0] }), /* @__PURE__ */ W("span", { children: e[1] })]
	}) : e.href ? /* @__PURE__ */ W("div", { children: /* @__PURE__ */ W("a", {
		href: e.href,
		children: e.text
	}) }) : e.startsWith("# ") ? /* @__PURE__ */ W("div", {
		class: "term-head",
		children: e.slice(2)
	}) : /* @__PURE__ */ W("div", { children: e });
}
function tt({ loc: e, articles: t, theme: n, setTheme: r, go: i, step: a, api: o }) {
	let [s, c] = B(""), [l, u] = B(null), [d, f] = B(""), [p, m] = B(0), h = H(null), g = H(null), _ = H([]), v = H(0), y = H(!1), b = $e(e), x = {
		loc: e,
		articles: t,
		theme: n,
		setTheme: r,
		go: i,
		step: a,
		path: b
	}, S = (e) => {
		let t = e.trim().replace(/^\//, "");
		if (!t) return u(null);
		let [n, ...r] = t.split(/\s+/), i = Q[n.toLowerCase()], a = i ? i(r.join(" "), x) : [`command not found: ${n}. Type help for the list.`];
		u(Array.isArray(a) ? a : null), Array.isArray(a) || g.current?.blur();
	};
	o.current = {
		focus: (e = "") => {
			c(e), g.current?.focus();
		},
		run: (e) => {
			S(e), g.current?.focus();
		}
	}, V(() => {
		if (!y.current) {
			y.current = !0;
			return;
		}
		u(null), f(`cd ${b}`);
		let e = setTimeout(() => f(""), 1800);
		return () => clearTimeout(e);
	}, [b]), V(() => {
		if (e.route !== "article") {
			m(0);
			return;
		}
		let t = 0, n = () => {
			t = 0;
			let e = document.documentElement.scrollHeight - window.innerHeight;
			m(e > 0 ? Math.min(100, Math.round(window.scrollY / e * 100)) : 0);
		}, r = () => {
			t ||= requestAnimationFrame(n);
		};
		return n(), window.addEventListener("scroll", r, { passive: !0 }), () => {
			window.removeEventListener("scroll", r), cancelAnimationFrame(t);
		};
	}, [e.route, e.slug]), V(() => {
		if (!l) return;
		let e = (e) => {
			h.current?.contains(e.target) || u(null);
		};
		return document.addEventListener("pointerdown", e), () => document.removeEventListener("pointerdown", e);
	}, [l]);
	let C = () => {
		let [, e, t, n, r] = /^(\/?)(\S*)(\s+)?(.*)$/.exec(s), i = n === void 0, a = i ? Object.keys(Q) : Ze(t, x), o = i ? t : r, l = i ? e : `${e}${t} `, d = a.filter((e) => e.startsWith(o));
		d.length !== 0 && (d.length === 1 ? (c(`${l}${d[0]}${i ? " " : ""}`), u(null)) : (c(l + Qe(d)), u(d.slice(0, 12).concat(d.length > 12 ? [`… ${d.length - 12} more`] : []))));
	};
	return /* @__PURE__ */ W("div", {
		class: "term",
		ref: h,
		children: [e.route === "article" && /* @__PURE__ */ W("span", {
			class: "term-progress",
			style: { width: `${p}%` }
		}), /* @__PURE__ */ W("div", {
			class: "shell term-wrap",
			children: [l && /* @__PURE__ */ W("div", {
				class: "term-out",
				role: "status",
				children: l.map((e, t) => /* @__PURE__ */ W(et, { line: e }, t))
			}), /* @__PURE__ */ W("form", {
				class: "term-line",
				onSubmit: (e) => {
					e.preventDefault(), s.trim() && _.current.push(s.trim()), v.current = _.current.length, c(""), S(s);
				},
				children: [
					/* @__PURE__ */ W("label", {
						class: "term-ps",
						for: "term-input",
						children: [
							/* @__PURE__ */ W("span", {
								class: "term-user",
								children: [
									"guest@",
									G.host,
									":"
								]
							}),
							/* @__PURE__ */ W("span", {
								class: "term-path",
								children: b
							}),
							/* @__PURE__ */ W("span", { children: "$" })
						]
					}),
					/* @__PURE__ */ W("input", {
						id: "term-input",
						ref: g,
						type: "text",
						value: s,
						onInput: (e) => c(e.currentTarget.value),
						onKeyDown: (e) => {
							if (e.key === "Escape") u(null), c(""), g.current.blur();
							else if (e.key === "Tab" && s) e.preventDefault(), C();
							else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
								e.preventDefault();
								let t = _.current;
								v.current = Math.max(0, Math.min(t.length, v.current + (e.key === "ArrowUp" ? -1 : 1))), c(t[v.current] || "");
							}
						},
						placeholder: d || "press / to type a command",
						"aria-label": "Terminal command",
						autocomplete: "off",
						autocapitalize: "off",
						autocorrect: "off",
						spellcheck: !1
					}),
					e.route === "article" && /* @__PURE__ */ W("span", {
						class: "term-pct",
						"aria-label": "Reading progress",
						children: [String(p).padStart(2, "0"), "%"]
					}),
					/* @__PURE__ */ W("span", {
						class: "term-themes",
						role: "group",
						"aria-label": "Theme",
						children: K.map((e) => /* @__PURE__ */ W("button", {
							type: "button",
							class: `sw sw-${e}`,
							"aria-pressed": e === n,
							"aria-label": `${e} theme`,
							title: `${e} theme`,
							onClick: () => r(e)
						}, e))
					}),
					/* @__PURE__ */ W("button", {
						type: "button",
						class: "term-help",
						"aria-label": "Keys and commands",
						onClick: () => u(l ? null : Xe),
						children: "[?]"
					})
				]
			})]
		})]
	});
}
//#endregion
//#region docs/Writing.jsx
function nt({ articles: e, loc: t, onSearch: n }) {
	let r = t.q.toLowerCase(), i = e.filter((e) => (!t.topic || e.topic === t.topic) && (!r || `${e.title} ${e.description}`.toLowerCase().includes(r))), a = !!(t.topic || r);
	return /* @__PURE__ */ W("div", {
		class: "cols page",
		children: [/* @__PURE__ */ W("aside", {
			class: "side",
			children: [
				/* @__PURE__ */ W("h1", {
					class: "page-title",
					children: "Writing"
				}),
				/* @__PURE__ */ W("p", {
					class: "lede",
					children: "Mostly notes on data, AI, and the engineering around both — written when something has been bothering me long enough that putting it down clears the desk."
				}),
				e.length > 0 && /* @__PURE__ */ W("p", {
					class: "count",
					children: [a ? `${i.length} of ${e.length}` : e.length, " entries"]
				})
			]
		}), /* @__PURE__ */ W("div", {
			class: "main",
			children: [
				/* @__PURE__ */ W("nav", {
					class: "tabs",
					"aria-label": "Topics",
					children: [
						/* @__PURE__ */ W("a", {
							href: "#/writing",
							class: t.topic ? "" : "on",
							children: "All"
						}),
						q.map((e) => /* @__PURE__ */ W("a", {
							href: `#/writing?topic=${e}`,
							class: t.topic === e ? "on" : "",
							children: e
						}, e)),
						/* @__PURE__ */ W("button", {
							type: "button",
							class: "tabs-search",
							onClick: n,
							children: [/* @__PURE__ */ W(X, { children: "/" }), " Search"]
						})
					]
				}),
				r && /* @__PURE__ */ W("p", {
					class: "query",
					children: [
						"grep “",
						t.q,
						"” ",
						/* @__PURE__ */ W("a", {
							href: t.topic ? `#/writing?topic=${t.topic}` : "#/writing",
							children: "clear"
						})
					]
				}),
				e.length === 0 ? /* @__PURE__ */ W("p", {
					class: "status",
					children: "Loading…"
				}) : i.length === 0 ? /* @__PURE__ */ W("p", {
					class: "status",
					children: "No entries match."
				}) : /* @__PURE__ */ W(Be, {
					articles: i,
					featureFirst: !a
				})
			]
		})]
	});
}
//#endregion
//#region docs/main.jsx
var rt = "fo:theme";
function it() {
	let [e, t] = B(() => {
		let e = document.documentElement.dataset.theme;
		return K.includes(e) ? e : K[0];
	});
	return [e, xe((e) => {
		t(e), document.documentElement.dataset.theme = e;
		try {
			window.localStorage.setItem(rt, e);
		} catch {}
	}, [])];
}
function at() {
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
function ot() {
	let [e, t = ""] = (window.location.hash || "").replace(/^#\/?/, "").split("?"), n = e.split("/").filter(Boolean);
	if (n[0] === "writing" && n[1]) return {
		route: "article",
		slug: n[1]
	};
	if (n[0] === "writing") {
		let e = new URLSearchParams(t);
		return {
			route: "writing",
			topic: e.get("topic") || "",
			q: e.get("q") || ""
		};
	}
	return n[0] === "contact" ? { route: "contact" } : { route: "home" };
}
var $ = (e) => {
	window.location.hash = e;
}, st = () => typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
function ct(e) {
	let t = [...document.querySelectorAll("[data-entry]")];
	if (t.length === 0) {
		window.scrollBy({
			top: e * window.innerHeight * .5,
			behavior: st()
		});
		return;
	}
	let n = t.indexOf(document.activeElement);
	t[n < 0 ? e > 0 ? 0 : t.length - 1 : Math.max(0, Math.min(t.length - 1, n + e))].focus();
}
function lt() {
	let [e, t] = it(), n = at(), [r, i] = B(ot), a = H(null);
	V(() => {
		let e = () => i(ot());
		return window.addEventListener("hashchange", e), () => window.removeEventListener("hashchange", e);
	}, []), V(() => {
		window.scrollTo({
			top: 0,
			behavior: "instant"
		});
	}, [r.route, r.slug]);
	let o = (e) => {
		if (r.route !== "article") return;
		let t = n[n.findIndex((e) => e.slug === r.slug) + e];
		t && $(J(t.slug));
	}, s = H(null);
	return s.current = (n) => {
		if (n.defaultPrevented || n.metaKey || n.ctrlKey || n.altKey || n.target.closest?.("input, textarea, select, [contenteditable]")) return;
		let r = {
			h: () => $("#/"),
			w: () => $("#/writing"),
			c: () => $("#/contact"),
			t: () => t(K[(K.indexOf(e) + 1) % K.length]),
			j: () => ct(1),
			k: () => ct(-1),
			"[": () => o(-1),
			"]": () => o(1),
			g: () => window.scrollTo({
				top: 0,
				behavior: st()
			}),
			G: () => window.scrollTo({
				top: document.documentElement.scrollHeight,
				behavior: st()
			}),
			"/": () => a.current.focus(),
			"?": () => a.current.run("help")
		}[n.key];
		r && (n.preventDefault(), r());
	}, V(() => {
		let e = (e) => s.current(e);
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, []), /* @__PURE__ */ W(S, { children: [/* @__PURE__ */ W("div", {
		class: "shell",
		children: [
			/* @__PURE__ */ W(Ie, { route: r.route }),
			/* @__PURE__ */ W("main", { children: r.route === "article" ? /* @__PURE__ */ W(Ge, {
				slug: r.slug,
				articles: n
			}, r.slug) : r.route === "writing" ? /* @__PURE__ */ W(nt, {
				articles: n,
				loc: r,
				onSearch: () => a.current.focus("grep ")
			}) : r.route === "contact" ? /* @__PURE__ */ W(Ke, {}) : /* @__PURE__ */ W(Ye, { articles: n }) }),
			/* @__PURE__ */ W(Le, {})
		]
	}), /* @__PURE__ */ W(tt, {
		loc: r,
		articles: n,
		theme: e,
		setTheme: t,
		go: $,
		step: o,
		api: a
	})] });
}
ue(/* @__PURE__ */ W(lt, {}), document.getElementById("root")), requestAnimationFrame(() => requestAnimationFrame(() => {
	document.body.classList.remove("booting");
}));
//#endregion
