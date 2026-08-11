//#region node_modules/preact/dist/preact.module.js
var e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h = {}, g = [], _ = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, v = Array.isArray;
function y(e, t) {
	for (var n in t) e[n] = t[n];
	return e;
}
function b(e) {
	e && e.parentNode && e.parentNode.removeChild(e);
}
function x(t, n, r) {
	var i, a, o, s = {};
	for (o in n) o == "key" ? i = n[o] : o == "ref" ? a = n[o] : s[o] = n[o];
	if (arguments.length > 2 && (s.children = arguments.length > 3 ? e.call(arguments, 2) : r), typeof t == "function" && t.defaultProps != null) for (o in t.defaultProps) s[o] === void 0 && (s[o] = t.defaultProps[o]);
	return S(t, s, i, a, null);
}
function S(e, r, i, a, o) {
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
function C() {
	return { current: null };
}
function w(e) {
	return e.children;
}
function T(e, t) {
	this.props = e, this.context = t;
}
function E(e, t) {
	if (t == null) return e.__ ? E(e.__, e.__i + 1) : null;
	for (var n; t < e.__k.length; t++) if ((n = e.__k[t]) != null && n.__e != null) return n.__e;
	return typeof e.type == "function" ? E(e) : null;
}
function D(e) {
	if (e.__P && e.__d) {
		var n = e.__v, r = n.__e, i = [], a = [], o = y({}, n);
		o.__v = n.__v + 1, t.vnode && t.vnode(o), ie(e.__P, o, n, e.__n, e.__P.namespaceURI, 32 & n.__u ? [r] : null, i, r ?? E(n), !!(32 & n.__u), a), o.__v = n.__v, o.__.__k[o.__i] = o, oe(i, o, a), n.__e = n.__ = null, o.__e != r && O(o);
	}
}
function O(e) {
	if ((e = e.__) != null && e.__c != null) return e.__e = e.__c.base = null, e.__k.some(function(t) {
		if (t != null && t.__e != null) return e.__e = e.__c.base = t.__e;
	}), O(e);
}
function k(e) {
	(!e.__d && (e.__d = !0) && r.push(e) && !A.__r++ || i != t.debounceRendering) && ((i = t.debounceRendering) || a)(A);
}
function A() {
	try {
		for (var e, t = 1; r.length;) r.length > t && r.sort(o), e = r.shift(), t = r.length, D(e);
	} finally {
		r.length = A.__r = 0;
	}
}
function ee(e, t, n, r, i, a, o, s, c, l, u) {
	var d, f, p, m, _, v, y = r && r.__k || g, b = t.length;
	for (c = te(n, t, y, c, b), d = 0; d < b; d++) (p = n.__k[d]) != null && (f = p.__i != -1 && y[p.__i] || h, p.__i = d, v = ie(e, p, f, i, a, o, s, c, l, u), m = p.__e, p.ref && f.ref != p.ref && (f.ref && le(f.ref, null, p), u.push(p.ref, p.__c || m, p)), _ == null && m != null && (_ = m), 4 & p.__u ? (c = j(p, c, e), f.__e &&= null) : typeof p.type == "function" && v !== void 0 ? c = v : m && (c = m.nextSibling), p.__u &= -7);
	return n.__e = _, c;
}
function te(e, t, n, r, i) {
	var a, o, s, c, l, u = n.length, d = u, f = 0;
	for (e.__k = Array(i), a = 0; a < i; a++) (o = t[a]) != null && typeof o != "boolean" && typeof o != "function" ? (typeof o == "string" || typeof o == "number" || typeof o == "bigint" || o.constructor == String ? o = e.__k[a] = S(null, o, null, null, null) : v(o) ? o = e.__k[a] = S(w, { children: o }, null, null, null) : o.constructor === void 0 && o.__b > 0 ? o = e.__k[a] = S(o.type, o.props, o.key, o.ref ? o.ref : null, o.__v) : e.__k[a] = o, c = a + f, o.__ = e, o.__b = e.__b + 1, s = null, (l = o.__i = N(o, n, c, d)) != -1 && (d--, (s = n[l]) && (s.__u |= 2)), s == null || s.__v == null ? (l == -1 && (i > u ? f-- : i < u && f++), typeof o.type != "function" && (o.__u |= 4)) : l != c && (l == c - 1 ? f-- : l == c + 1 ? f++ : (l > c ? f-- : f++, o.__u |= 4))) : e.__k[a] = null;
	if (d) for (a = 0; a < u; a++) (s = n[a]) != null && !(2 & s.__u) && (s.__e == r && (r = E(s)), ue(s, s));
	return r;
}
function j(e, t, n) {
	var r, i;
	if (typeof e.type == "function") {
		for (r = e.__k, i = 0; r && i < r.length; i++) r[i] && (r[i].__ = e, t = j(r[i], t, n));
		return t;
	}
	e.__e != t && (t && e.type && !t.parentNode && (t = E(e)), t = n.insertBefore(e.__e, t || null));
	do
		t &&= t.nextSibling;
	while (t != null && t.nodeType == 8);
	return t;
}
function M(e, t) {
	return t ||= [], e == null || typeof e == "boolean" || (v(e) ? e.some(function(e) {
		M(e, t);
	}) : t.push(e)), t;
}
function N(e, t, n, r) {
	var i, a, o, s = e.key, c = e.type, l = t[n], u = l != null && (2 & l.__u) == 0;
	if (l === null && s == null || u && s == l.key && c == l.type) return n;
	if (r > +!!u) {
		for (i = n - 1, a = n + 1; i >= 0 || a < t.length;) if ((l = t[o = i >= 0 ? i-- : a++]) != null && !(2 & l.__u) && s == l.key && c == l.type) return o;
	}
	return -1;
}
function ne(e, t, n) {
	t[0] == "-" ? e.setProperty(t, n ?? "") : e[t] = n == null ? "" : typeof n != "number" || _.test(t) ? n : n + "px";
}
function P(e, t, n, r, i) {
	var a, o;
	n: if (t == "style") if (typeof n == "string") e.style.cssText = n;
	else {
		if (typeof r == "string" && (e.style.cssText = r = ""), r) for (t in r) n && t in n || ne(e.style, t, "");
		if (n) for (t in n) r && n[t] == r[t] || ne(e.style, t, n[t]);
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
function re(e) {
	return function(n) {
		if (this.l) {
			var r = this.l[n.type + e];
			if (n[c] == null) n[c] = d++;
			else if (n[c] < r[l]) return;
			return r(t.event ? t.event(n) : n);
		}
	};
}
function ie(e, n, r, i, a, o, s, c, l, u) {
	var d, f, p, m, h, _, x, S, C, D, O, k, A, te, j, M, N = n.type;
	if (n.constructor !== void 0) return null;
	128 & r.__u && (l = !!(32 & r.__u), o = [c = n.__e = r.__e]), (d = t.__b) && d(n);
	n: if (typeof N == "function") {
		f = s.length;
		try {
			if (C = n.props, D = N.prototype && N.prototype.render, O = (d = N.contextType) && i[d.__c], k = d ? O ? O.props.value : d.__ : i, r.__c ? S = (p = n.__c = r.__c).__ = p.__E : (D ? n.__c = p = new N(C, k) : (n.__c = p = new T(C, k), p.constructor = N, p.render = de), O && O.sub(p), p.state ||= {}, p.__n = i, m = p.__d = !0, p.__h = [], p._sb = []), D && p.__s == null && (p.__s = p.state), D && N.getDerivedStateFromProps != null && (p.__s == p.state && (p.__s = y({}, p.__s)), y(p.__s, N.getDerivedStateFromProps(C, p.__s))), h = p.props, _ = p.state, p.__v = n, m) D && N.getDerivedStateFromProps == null && p.componentWillMount != null && p.componentWillMount(), D && p.componentDidMount != null && p.__h.push(p.componentDidMount);
			else {
				if (D && N.getDerivedStateFromProps == null && C !== h && p.componentWillReceiveProps != null && p.componentWillReceiveProps(C, k), n.__v == r.__v || !p.__e && p.shouldComponentUpdate != null && !1 === p.shouldComponentUpdate(C, p.__s, k)) {
					n.__v != r.__v && (p.props = C, p.state = p.__s, p.__d = !1), n.__e = r.__e, n.__k = r.__k, n.__k.some(function(e) {
						e && (e.__ = n);
					}), g.push.apply(p.__h, p._sb), p._sb = [], p.__h.length && s.push(p), c = E(r);
					break n;
				}
				p.componentWillUpdate != null && p.componentWillUpdate(C, p.__s, k), D && p.componentDidUpdate != null && p.__h.push(function() {
					p.componentDidUpdate(h, _, x);
				});
			}
			if (p.context = k, p.props = C, p.__P = e, p.__e = !1, A = t.__r, te = 0, D) p.state = p.__s, p.__d = !1, A && A(n), d = p.render(p.props, p.state, p.context), g.push.apply(p.__h, p._sb), p._sb = [];
			else do
				p.__d = !1, A && A(n), d = p.render(p.props, p.state, p.context), p.state = p.__s;
			while (p.__d && ++te < 25);
			p.state = p.__s, p.getChildContext != null && (i = y(y({}, i), p.getChildContext())), D && !m && p.getSnapshotBeforeUpdate != null && (x = p.getSnapshotBeforeUpdate(h, _)), j = d != null && d.type === w && d.key == null ? se(d.props.children) : d, c = ee(e, v(j) ? j : [j], n, r, i, a, o, s, c, l, u), p.base = n.__e, n.__u &= -161, p.__h.length && s.push(p), S && (p.__E = p.__ = null);
		} catch (e) {
			if (s.length = f, n.__v = null, l || o != null) {
				if (e.then) {
					for (n.__u |= l ? 160 : 128; c && c.nodeType == 8 && c.nextSibling;) c = c.nextSibling;
					o != null && (o[o.indexOf(c)] = null), n.__e = c;
				} else if (o != null) for (M = o.length; M--;) b(o[M]);
			} else n.__e = r.__e;
			n.__k ??= r.__k || [], e.then || ae(n), t.__e(e, n, r);
		}
	} else o == null && n.__v == r.__v ? (n.__k = r.__k, n.__e = r.__e) : c = n.__e = ce(r.__e, n, r, i, a, o, s, l, u);
	return (d = t.diffed) && d(n), 128 & n.__u ? void 0 : c;
}
function ae(e) {
	e && (e.__c && (e.__c.__e = !0), e.__k && e.__k.some(ae));
}
function oe(e, n, r) {
	for (var i = 0; i < r.length; i++) le(r[i], r[++i], r[++i]);
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
function se(e) {
	return typeof e != "object" || !e || e.__b > 0 ? e : v(e) ? e.map(se) : e.constructor === void 0 ? y({}, e) : null;
}
function ce(n, r, i, a, o, s, c, l, u) {
	var d, f, p, m, g, _, y, x = i.props || h, S = r.props, C = r.type;
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
		for (d in x) g = x[d], d == "dangerouslySetInnerHTML" ? p = g : d == "children" || d in S || d == "value" && "defaultValue" in S || d == "checked" && "defaultChecked" in S || P(n, d, null, g, o);
		for (d in S) g = S[d], d == "children" ? m = g : d == "dangerouslySetInnerHTML" ? f = g : d == "value" ? _ = g : d == "checked" ? y = g : l && typeof g != "function" || x[d] === g || P(n, d, g, x[d], o);
		if (f) l || p && (f.__html == p.__html || f.__html == n.innerHTML) || (n.innerHTML = f.__html), r.__k = [];
		else if (p && (n.innerHTML = ""), ee(r.type == "template" ? n.content : n, v(m) ? m : [m], r, i, a, C == "foreignObject" ? "http://www.w3.org/1999/xhtml" : o, s, c, s ? s[0] : i.__k && E(i, 0), l, u), s != null) for (d = s.length; d--;) b(s[d]);
		l && C != "textarea" || (d = "value", C == "progress" && _ == null ? n.removeAttribute("value") : _ != null && (_ !== n[d] || C == "progress" && !_ || C == "option" && _ != x[d]) && P(n, d, _, x[d], o), d = "checked", y != null && y != n[d] && P(n, d, y, x[d], o));
	}
	return n;
}
function le(e, n, r) {
	try {
		if (typeof e == "function") {
			var i = typeof e.__u == "function";
			i && e.__u(), i && n == null || (e.__u = e(n));
		} else e.current = n;
	} catch (e) {
		t.__e(e, r);
	}
}
function ue(e, n, r) {
	var i, a;
	if (t.unmount && t.unmount(e), (i = e.ref) && (i.current && i.current != e.__e || le(i, null, n)), (i = e.__c) != null) {
		if (i.componentWillUnmount) try {
			i.componentWillUnmount();
		} catch (e) {
			t.__e(e, n);
		}
		i.base = i.__P = i.__n = null;
	}
	if (i = e.__k) for (a = 0; a < i.length; a++) i[a] && ue(i[a], n, r || typeof e.type != "function");
	r || b(e.__e), e.__c = e.__ = e.__e = void 0;
}
function de(e, t, n) {
	return this.constructor(e, n);
}
function F(n, r, i) {
	var a, o, s, c;
	r == document && (r = document.documentElement), t.__ && t.__(n, r), o = (a = typeof i == "function") ? null : i && i.__k || r.__k, s = [], c = [], ie(r, n = (!a && i || r).__k = x(w, null, [n]), o || h, h, r.namespaceURI, !a && i ? [i] : o ? null : r.firstChild ? e.call(r.childNodes) : null, s, !a && i ? i : o ? o.__e : r.firstChild, a, c), oe(s, n, c), n.props.children = null;
}
function fe(e, t) {
	F(e, t, fe);
}
function pe(t, n, r) {
	var i, a, o, s, c = y({}, t.props);
	for (o in t.type && t.type.defaultProps && (s = t.type.defaultProps), n) o == "key" ? i = n[o] : o == "ref" ? a = n[o] : c[o] = n[o] === void 0 && s != null ? s[o] : n[o];
	return arguments.length > 2 && (c.children = arguments.length > 3 ? e.call(arguments, 2) : r), S(t.type, c, i || t.key, a || t.ref, null);
}
function me(e) {
	function t(e) {
		var n, r;
		return this.getChildContext || (n = /* @__PURE__ */ new Set(), (r = {})[t.__c] = this, this.getChildContext = function() {
			return r;
		}, this.componentWillUnmount = function() {
			n = null;
		}, this.shouldComponentUpdate = function(e) {
			this.props.value != e.value && n.forEach(function(e) {
				e.__e = !0, k(e);
			});
		}, this.sub = function(e) {
			n.add(e);
			var t = e.componentWillUnmount;
			e.componentWillUnmount = function() {
				n && n.delete(e), t && t.call(e);
			};
		}), e.children;
	}
	return t.__c = "__cC" + m++, t.__ = e, t.Provider = t.__l = (t.Consumer = function(e, t) {
		return e.children(t);
	}).contextType = t, t;
}
e = g.slice, t = { __e: function(e, t, n, r) {
	for (var i, a, o; t = t.__;) if ((i = t.__c) && !i.__) try {
		if ((a = i.constructor) && a.getDerivedStateFromError != null && (i.setState(a.getDerivedStateFromError(e)), o = i.__d), i.componentDidCatch != null && (i.componentDidCatch(e, r || {}), o = i.__d), o) return i.__E = i;
	} catch (t) {
		e = t;
	}
	throw e;
} }, n = 0, T.prototype.setState = function(e, t) {
	var n = this.__s != null && this.__s != this.state ? this.__s : this.__s = y({}, this.state);
	typeof e == "function" && (e = e(y({}, n), this.props)), e && y(n, e), e != null && this.__v && (t && this._sb.push(t), k(this));
}, T.prototype.forceUpdate = function(e) {
	this.__v && (this.__e = !0, e && this.__h.push(e), k(this));
}, T.prototype.render = w, r = [], a = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, o = function(e, t) {
	return e.__v.__b - t.__v.__b;
}, A.__r = 0, s = Math.random().toString(8), c = "__d" + s, l = "__a" + s, u = /(PointerCapture)$|Capture$/i, d = 0, f = re(!1), p = re(!0), m = 0;
//#endregion
//#region node_modules/preact/hooks/dist/hooks.module.js
var I, L, he, ge, R = 0, _e = [], z = t, ve = z.__b, ye = z.__r, be = z.diffed, xe = z.__c, Se = z.unmount, Ce = z.__;
function B(e, t) {
	z.__h && z.__h(L, e, R || t), R = 0;
	var n = L.__H ||= {
		__: [],
		__h: []
	};
	return e >= n.__.length && n.__.push({}), n.__[e];
}
function V(e) {
	return R = 1, we(Re, e);
}
function we(e, t, n) {
	var r = B(I++, 2);
	if (r.t = e, !r.__c && (r.__ = [n ? n(t) : Re(void 0, t), function(e) {
		var t = r.__N ? r.__N[0] : r.__[0], n = r.t(t, e);
		t !== n && (r.__N = [n, r.__[1]], r.__c.setState({}));
	}], r.__c = L, !L.__f)) {
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
		L.__f = !0;
		var a = L.shouldComponentUpdate, o = L.componentWillUpdate;
		L.componentWillUpdate = function(e, t, n) {
			if (this.__e) {
				var r = a;
				a = void 0, i(e, t, n), a = r;
			}
			o && o.call(this, e, t, n);
		}, L.shouldComponentUpdate = i;
	}
	return r.__N || r.__;
}
function Te(e, t) {
	var n = B(I++, 3);
	!z.__s && Le(n.__H, t) && (n.__ = e, n.u = t, L.__H.__h.push(n));
}
function H(e, t) {
	var n = B(I++, 4);
	!z.__s && Le(n.__H, t) && (n.__ = e, n.u = t, L.__h.push(n));
}
function Ee(e) {
	return R = 5, U(function() {
		return { current: e };
	}, []);
}
function De(e, t, n) {
	R = 6, H(function() {
		if (typeof e == "function") {
			var n = e(t());
			return function() {
				e(null), n && typeof n == "function" && n();
			};
		}
		if (e) return e.current = t(), function() {
			return e.current = null;
		};
	}, n == null ? n : n.concat(e));
}
function U(e, t) {
	var n = B(I++, 7);
	return Le(n.__H, t) && (n.__ = e(), n.__H = t, n.__h = e), n.__;
}
function Oe(e, t) {
	return R = 8, U(function() {
		return e;
	}, t);
}
function ke(e) {
	var t = L.context[e.__c], n = B(I++, 9);
	return n.c = e, t ? (n.__ ?? (n.__ = !0, t.sub(L)), t.props.value) : e.__;
}
function Ae(e, t) {
	z.useDebugValue && z.useDebugValue(t ? t(e) : e);
}
function je() {
	var e = B(I++, 11);
	if (!e.__) {
		for (var t = L.__v; t !== null && !t.__m && t.__ !== null;) t = t.__;
		var n = t.__m ||= [0, 0];
		e.__ = "P" + n[0] + "-" + n[1]++;
	}
	return e.__;
}
function Me() {
	for (var e; e = _e.shift();) {
		var t = e.__H;
		if (e.__P && t) try {
			t.__h.some(Fe), t.__h.some(Ie), t.__h = [];
		} catch (n) {
			t.__h = [], z.__e(n, e.__v);
		}
	}
}
z.__b = function(e) {
	L = null, ve && ve(e);
}, z.__ = function(e, t) {
	e && t.__k && t.__k.__m && (e.__m = t.__k.__m), Ce && Ce(e, t);
}, z.__r = function(e) {
	ye && ye(e), I = 0;
	var t = (L = e.__c).__H;
	t && (he === L ? (t.__h = [], L.__h = [], t.__.some(function(e) {
		e.__N && (e.__ = e.__N), e.u = e.__N = void 0;
	})) : (t.__h.some(Fe), t.__h.some(Ie), t.__h = [], I = 0)), he = L;
}, z.diffed = function(e) {
	be && be(e);
	var t = e.__c;
	t && t.__H && (t.__H.__h.length && (_e.push(t) !== 1 && ge === z.requestAnimationFrame || ((ge = z.requestAnimationFrame) || Pe)(Me)), t.__H.__.some(function(e) {
		e.u &&= (e.__H = e.u, void 0);
	})), he = L = null;
}, z.__c = function(e, t) {
	t.some(function(e) {
		try {
			e.__h.some(Fe), e.__h = e.__h.filter(function(e) {
				return !e.__ || Ie(e);
			});
		} catch (n) {
			t.some(function(e) {
				e.__h &&= [];
			}), t = [], z.__e(n, e.__v);
		}
	}), xe && xe(e, t);
}, z.unmount = function(e) {
	Se && Se(e);
	var t, n = e.__c;
	n && n.__H && (n.__H.__.some(function(e) {
		try {
			Fe(e);
		} catch (e) {
			t = e;
		}
	}), n.__H = void 0, t && z.__e(t, n.__v));
};
var Ne = typeof requestAnimationFrame == "function";
function Pe(e) {
	var t, n = function() {
		clearTimeout(r), Ne && cancelAnimationFrame(t), setTimeout(e);
	}, r = setTimeout(n, 35);
	Ne && (t = requestAnimationFrame(n));
}
function Fe(e) {
	var t = L, n = e.__c;
	typeof n == "function" && (e.__c = void 0, n()), L = t;
}
function Ie(e) {
	var t = L;
	e.__c = e.__(), L = t;
}
function Le(e, t) {
	return !e || e.length !== t.length || t.some(function(t, n) {
		return t !== e[n];
	});
}
function Re(e, t) {
	return typeof t == "function" ? t(e) : t;
}
//#endregion
//#region node_modules/preact/compat/dist/compat.module.js
function ze(e, t) {
	for (var n in t) e[n] = t[n];
	return e;
}
function Be(e, t) {
	for (var n in e) if (n !== "__source" && !(n in t)) return !0;
	for (var r in t) if (r !== "__source" && e[r] !== t[r]) return !0;
	return !1;
}
function Ve(e, t) {
	var n = t(), r = V({ t: {
		__: n,
		u: t
	} }), i = r[0].t, a = r[1];
	return H(function() {
		i.__ = n, i.u = t, He(i) && a({ t: i });
	}, [
		e,
		n,
		t
	]), Te(function() {
		return He(i) && a({ t: i }), e(function() {
			He(i) && a({ t: i });
		});
	}, [e]), n;
}
function He(e) {
	try {
		return !((t = e.__) === (n = e.u()) && (t !== 0 || 1 / t == 1 / n) || t != t && n != n);
	} catch {
		return !0;
	}
	var t, n;
}
function Ue(e) {
	e();
}
function We(e) {
	return e;
}
function Ge() {
	return [!1, Ue];
}
var Ke = H;
function qe(e, t) {
	this.props = e, this.context = t;
}
function Je(e, t) {
	function n(e) {
		var n = this.props.ref;
		return n != e.ref && n && (typeof n == "function" ? n(null) : n.current = null), t ? !t(this.props, e) || n != e.ref : Be(this.props, e);
	}
	function r(t) {
		return this.shouldComponentUpdate = n, x(e, t);
	}
	return r.displayName = "Memo(" + (e.displayName || e.name) + ")", r.__f = r.prototype.isReactComponent = !0, r.type = e, r;
}
(qe.prototype = new T()).isPureReactComponent = !0, qe.prototype.shouldComponentUpdate = function(e, t) {
	return Be(this.props, e) || Be(this.state, t);
};
var Ye = t.__b;
t.__b = function(e) {
	e.type && e.type.__f && e.ref && (e.props.ref = e.ref, e.ref = null), Ye && Ye(e);
};
var Xe = typeof Symbol < "u" && Symbol.for && Symbol.for("react.forward_ref") || 3911;
function Ze(e) {
	function t(t) {
		var n = ze({}, t);
		return delete n.ref, e(n, t.ref || null);
	}
	return t.$$typeof = Xe, t.render = e, t.prototype.isReactComponent = t.__f = !0, t.displayName = "ForwardRef(" + (e.displayName || e.name) + ")", t;
}
var Qe = function(e, t) {
	return e == null ? null : M(M(e).map(t));
}, $e = {
	map: Qe,
	forEach: Qe,
	count: function(e) {
		return e ? M(e).length : 0;
	},
	only: function(e) {
		var t = M(e);
		if (t.length !== 1) throw "Children.only";
		return t[0];
	},
	toArray: M
}, et = t.__e;
t.__e = function(e, t, n, r) {
	if (e.then) {
		for (var i, a = t; a = a.__;) if ((i = a.__c) && i.__c) return t.__e ?? (t.__e = n.__e, t.__k = n.__k || []), i.__c(e, t);
	}
	et(e, t, n, r);
};
var tt = t.unmount;
function nt(e, t, n) {
	return e && (e.__c && e.__c.__H && (e.__c.__H.__.forEach(function(e) {
		typeof e.__c == "function" && e.__c();
	}), e.__c.__H = null), (e = ze({}, e)).__c != null && (e.__c.__P === n && (e.__c.__P = t), e.__c.__e = !0, e.__c = null), e.__k = e.__k && e.__k.map(function(e) {
		return nt(e, t, n);
	})), e;
}
function rt(e, t, n) {
	return e && n && (e.__v = null, e.__k = e.__k && e.__k.map(function(e) {
		return rt(e, t, n);
	}), e.__c && e.__c.__P === t && (e.__e && n.appendChild(e.__e), e.__c.__e = !0, e.__c.__P = n)), e;
}
function W() {
	this.__u = 0, this.o = null, this.__b = null;
}
function it(e) {
	var t = e.__ && e.__.__c;
	return t && t.__a && t.__a(e);
}
function at(e) {
	var t, n, r, i = null;
	function a(a) {
		if (t || (t = e()).then(function(e) {
			e && (i = e.default || e), r = !0;
		}, function(e) {
			n = e, r = !0;
		}), n) throw n;
		if (!r) throw t;
		return i ? x(i, a) : null;
	}
	return a.displayName = "Lazy", a.__f = !0, a;
}
function G() {
	this.i = null, this.l = null;
}
t.unmount = function(e) {
	var t = e.__c;
	t && (t.__z = !0), t && t.__R && t.__R(), t && 32 & e.__u && (e.type = null), tt && tt(e);
}, (W.prototype = new T()).__c = function(e, t) {
	var n = t.__c, r = this;
	r.o ??= [], r.o.push(n);
	var i = it(r.__v), a = !1, o = function() {
		a || r.__z || (a = !0, n.__R = null, i ? i(c) : c());
	};
	n.__R = o;
	var s = n.__P;
	n.__P = null;
	var c = function() {
		if (!--r.__u) {
			if (r.state.__a) {
				var e = r.state.__a;
				r.__v.__k[0] = rt(e, e.__c.__P, e.__c.__O);
			}
			var t;
			for (r.setState({ __a: r.__b = null }); t = r.o.pop();) t.__P = s, t.forceUpdate();
		}
	};
	r.__u++ || 32 & t.__u || r.setState({ __a: r.__b = r.__v.__k[0] }), e.then(o, o);
}, W.prototype.componentWillUnmount = function() {
	this.o = [];
}, W.prototype.render = function(e, t) {
	if (this.__b) {
		if (this.__v.__k) {
			var n = document.createElement("div"), r = this.__v.__k[0].__c;
			this.__v.__k[0] = nt(this.__b, n, r.__O = r.__P);
		}
		this.__b = null;
	}
	var i = t.__a && x(w, null, e.fallback);
	return i && (i.__u &= -33), [x(w, null, t.__a ? null : e.children), i];
};
var ot = function(e, t, n) {
	if (++n[1] === n[0] && e.l.delete(t), e.props.revealOrder && (e.props.revealOrder[0] !== "t" || !e.l.size)) for (n = e.i; n;) {
		for (; n.length > 3;) n.pop()();
		if (n[1] < n[0]) break;
		e.i = n = n[2];
	}
};
function st(e) {
	return this.getChildContext = function() {
		return e.context;
	}, e.children;
}
function ct(e) {
	var t = this, n = e.h;
	if (t.componentWillUnmount = function() {
		F(null, t.v), t.v = null, t.h = null;
	}, t.h && t.h !== n && t.componentWillUnmount(), !t.v) {
		for (var r = t.__v; r !== null && !r.__m && r.__ !== null;) r = r.__;
		t.h = n, t.v = {
			nodeType: 1,
			parentNode: n,
			childNodes: [],
			__k: { __m: r.__m },
			contains: function() {
				return !0;
			},
			namespaceURI: n.namespaceURI,
			insertBefore: function(e, n) {
				this.childNodes.push(e), t.h.insertBefore(e, n);
			},
			removeChild: function(e) {
				this.childNodes.splice(this.childNodes.indexOf(e) >>> 1, 1), t.h.removeChild(e);
			}
		};
	}
	F(x(st, { context: t.context }, e.__v), t.v);
}
function lt(e, t) {
	var n = x(ct, {
		__v: e,
		h: t
	});
	return n.containerInfo = t, n;
}
(G.prototype = new T()).__a = function(e) {
	var t = this, n = it(t.__v), r = t.l.get(e);
	return r[0]++, function(i) {
		var a = function() {
			t.props.revealOrder ? (r.push(i), ot(t, e, r)) : i();
		};
		n ? n(a) : a();
	};
}, G.prototype.render = function(e) {
	this.i = null, this.l = /* @__PURE__ */ new Map();
	var t = M(e.children);
	e.revealOrder && e.revealOrder[0] === "b" && t.reverse();
	for (var n = t.length; n--;) this.l.set(t[n], this.i = [
		1,
		0,
		this.i
	]);
	return e.children;
}, G.prototype.componentDidUpdate = G.prototype.componentDidMount = function() {
	var e = this;
	this.l.forEach(function(t, n) {
		ot(e, n, t);
	});
};
var ut = typeof Symbol < "u" && Symbol.for && Symbol.for("react.element") || 60103, dt = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, ft = /^on(Ani|Tra|Tou|BeforeInp|Compo)/, pt = /[A-Z0-9]/g, mt = typeof document < "u", ht = function(e) {
	return (typeof Symbol < "u" && typeof Symbol() == "symbol" ? /fil|che|rad/ : /fil|che|ra/).test(e);
};
function gt(e, t, n) {
	return t.__k ?? (t.textContent = ""), F(e, t), typeof n == "function" && n(), e ? e.__c : null;
}
function _t(e, t, n) {
	return fe(e, t), typeof n == "function" && n(), e ? e.__c : null;
}
T.prototype.isReactComponent = !0, [
	"componentWillMount",
	"componentWillReceiveProps",
	"componentWillUpdate"
].forEach(function(e) {
	Object.defineProperty(T.prototype, e, {
		configurable: !0,
		get: function() {
			return this["UNSAFE_" + e];
		},
		set: function(t) {
			Object.defineProperty(this, e, {
				configurable: !0,
				writable: !0,
				value: t
			});
		}
	});
});
var vt = t.event;
t.event = function(e) {
	return vt && (e = vt(e)), e.persist = function() {}, e.isPropagationStopped = function() {
		return this.cancelBubble;
	}, e.isDefaultPrevented = function() {
		return this.defaultPrevented;
	}, e.nativeEvent = e;
};
var yt, bt = {
	configurable: !0,
	get: function() {
		return this.class;
	}
}, xt = t.vnode;
t.vnode = function(e) {
	typeof e.type == "string" && function(e) {
		var t = e.props, n = e.type, r = {}, i = n.indexOf("-") == -1;
		for (var a in t) {
			var o = t[a];
			if (!(a === "value" && "defaultValue" in t && o == null || mt && a === "children" && n === "noscript" || a === "class" || a === "className")) {
				var s = a.toLowerCase();
				a === "defaultValue" && "value" in t && t.value == null ? a = "value" : a === "download" && !0 === o ? o = "" : s === "translate" && o === "no" ? o = !1 : s[0] === "o" && s[1] === "n" ? s === "ondoubleclick" ? a = "ondblclick" : s !== "onchange" || n !== "input" && n !== "textarea" || ht(t.type) ? s === "onfocus" ? a = "onfocusin" : s === "onblur" ? a = "onfocusout" : ft.test(a) && (a = s) : s = a = "oninput" : i && dt.test(a) ? a = a.replace(pt, "-$&").toLowerCase() : o === null && (o = void 0), s === "oninput" && r[a = s] && (a = "oninputCapture"), r[a] = o;
			}
		}
		n == "select" && (r.multiple && Array.isArray(r.value) && (r.value = M(t.children).forEach(function(e) {
			e.props.selected = r.value.indexOf(e.props.value) != -1;
		})), r.defaultValue != null && (r.value = M(t.children).forEach(function(e) {
			e.props.selected = r.multiple ? r.defaultValue.indexOf(e.props.value) != -1 : r.defaultValue == e.props.value;
		}))), t.class && !t.className ? (r.class = t.class, Object.defineProperty(r, "className", bt)) : t.className && (r.class = r.className = t.className), e.props = r;
	}(e), e.$$typeof = ut, xt && xt(e);
};
var St = t.__r;
t.__r = function(e) {
	St && St(e), yt = e.__c;
};
var Ct = t.diffed;
t.diffed = function(e) {
	Ct && Ct(e);
	var t = e.props, n = e.__e;
	n != null && e.type === "textarea" && "value" in t && t.value !== n.value && (n.value = t.value == null ? "" : t.value), yt = null;
};
var wt = { ReactCurrentDispatcher: { current: {
	readContext: function(e) {
		return yt.__n[e.__c].props.value;
	},
	useCallback: Oe,
	useContext: ke,
	useDebugValue: Ae,
	useDeferredValue: We,
	useEffect: Te,
	useId: je,
	useImperativeHandle: De,
	useInsertionEffect: Ke,
	useLayoutEffect: H,
	useMemo: U,
	useReducer: we,
	useRef: Ee,
	useState: V,
	useSyncExternalStore: Ve,
	useTransition: Ge
} } };
function Tt(e) {
	return x.bind(null, e);
}
function K(e) {
	return !!e && e.$$typeof === ut;
}
function Et(e) {
	return K(e) && e.type === w;
}
function Dt(e) {
	return !!e && typeof e.displayName == "string" && e.displayName.indexOf("Memo(") == 0;
}
function Ot(e) {
	return K(e) ? pe.apply(null, arguments) : e;
}
function kt(e) {
	return !!e.__k && (F(null, e), !0);
}
function At(e) {
	return e && (e.base || e.nodeType === 1 && e) || null;
}
var q = {
	useState: V,
	useId: je,
	useReducer: we,
	useEffect: Te,
	useLayoutEffect: H,
	useInsertionEffect: Ke,
	useTransition: Ge,
	useDeferredValue: We,
	useSyncExternalStore: Ve,
	startTransition: Ue,
	useRef: Ee,
	useImperativeHandle: De,
	useMemo: U,
	useCallback: Oe,
	useContext: ke,
	useDebugValue: Ae,
	version: "18.3.1",
	Children: $e,
	render: gt,
	hydrate: _t,
	unmountComponentAtNode: kt,
	createPortal: lt,
	createElement: x,
	createContext: me,
	createFactory: Tt,
	cloneElement: Ot,
	createRef: C,
	Fragment: w,
	isValidElement: K,
	isElement: K,
	isFragment: Et,
	isMemo: Dt,
	findDOMNode: At,
	Component: T,
	PureComponent: qe,
	memo: Je,
	forwardRef: Ze,
	flushSync: function(e, n) {
		var r, i = t.debounceRendering;
		t.debounceRendering = function(e) {
			r = e;
		};
		try {
			var a = e(n);
			return r && r(), a;
		} finally {
			t.debounceRendering = i;
		}
	},
	unstable_batchedUpdates: function(e, t) {
		return e(t);
	},
	StrictMode: w,
	Suspense: W,
	SuspenseList: G,
	lazy: at,
	__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: wt
};
//#endregion
//#region node_modules/preact/compat/client.mjs
function jt(e) {
	return {
		render: function(t) {
			gt(t, e);
		},
		unmount: function() {
			kt(e);
		}
	};
}
//#endregion
//#region node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js
var Mt = 0;
Array.isArray;
function J(e, n, r, i, a, o) {
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
		__v: --Mt,
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
var Y = {
	name: "Francesco Orozco",
	initial: "f",
	initials: "FO",
	role: "AI Engineer & Data Scientist",
	company: "Bloom Growth",
	email: "franccesco@thatai.dev",
	github: "github.com/franccesco",
	twitter: "@__franccesco",
	linkedin: "linkedin.com/in/franccesco"
}, Nt = {
	"arrow-up-right": /* @__PURE__ */ J(w, { children: [/* @__PURE__ */ J("path", { d: "M7 17 17 7" }), /* @__PURE__ */ J("path", { d: "M8 7h9v9" })] }),
	"arrow-right": /* @__PURE__ */ J(w, { children: [/* @__PURE__ */ J("path", { d: "M5 12h14" }), /* @__PURE__ */ J("path", { d: "M13 6l6 6-6 6" })] }),
	rss: /* @__PURE__ */ J(w, { children: [
		/* @__PURE__ */ J("path", { d: "M4 11a9 9 0 0 1 9 9" }),
		/* @__PURE__ */ J("path", { d: "M4 4a16 16 0 0 1 16 16" }),
		/* @__PURE__ */ J("circle", {
			cx: "5.5",
			cy: "18.5",
			r: "1"
		})
	] }),
	mail: /* @__PURE__ */ J(w, { children: [/* @__PURE__ */ J("rect", {
		x: "3",
		y: "5",
		width: "18",
		height: "14",
		rx: "1.5"
	}), /* @__PURE__ */ J("path", { d: "m4 7 8 6 8-6" })] }),
	github: /* @__PURE__ */ J("path", { d: "M9 19c-4 1.5-4-2-6-2.5M15 22v-3.4a3 3 0 0 0-.8-2.3c2.7-.3 5.5-1.3 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.3 4.3 0 0 0-.1-3.2s-1-.3-3.4 1.3a11.7 11.7 0 0 0-6 0C6.5 1.6 5.5 1.9 5.5 1.9a4.3 4.3 0 0 0-.1 3.2A4.6 4.6 0 0 0 4.1 8.3c0 4.6 2.8 5.7 5.5 6a3 3 0 0 0-.8 2.3V22" }),
	twitter: /* @__PURE__ */ J("path", { d: "M17.5 3h3l-7 8 8.5 10h-6.5l-5-6.5L4 21H1l7.5-9L0 3h6.6l4.5 6L17.5 3z" }),
	linkedin: /* @__PURE__ */ J(w, { children: [/* @__PURE__ */ J("rect", {
		x: "3",
		y: "3",
		width: "18",
		height: "18",
		rx: "2"
	}), /* @__PURE__ */ J("path", { d: "M7 10v7M7 7v.01M11 17v-4a2 2 0 0 1 4 0v4M11 11v6" })] }),
	check: /* @__PURE__ */ J("path", { d: "m4 12 5 5L20 6" }),
	copy: /* @__PURE__ */ J(w, { children: [/* @__PURE__ */ J("rect", {
		x: "9",
		y: "9",
		width: "11",
		height: "11",
		rx: "1.5"
	}), /* @__PURE__ */ J("path", { d: "M5 15V5a1 1 0 0 1 1-1h10" })] }),
	sun: /* @__PURE__ */ J(w, { children: [/* @__PURE__ */ J("circle", {
		cx: "12",
		cy: "12",
		r: "4"
	}), /* @__PURE__ */ J("path", { d: "M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4" })] }),
	moon: /* @__PURE__ */ J("path", { d: "M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" }),
	monitor: /* @__PURE__ */ J(w, { children: [/* @__PURE__ */ J("rect", {
		x: "2.5",
		y: "4",
		width: "19",
		height: "13",
		rx: "1.5"
	}), /* @__PURE__ */ J("path", { d: "M9 21h6M12 17v4" })] })
};
function X({ name: e, size: t = 16, style: n }) {
	let r = Nt[e];
	return r ? /* @__PURE__ */ J("svg", {
		viewBox: "0 0 24 24",
		width: t,
		height: t,
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		style: {
			display: "inline-block",
			verticalAlign: "-0.18em",
			flexShrink: 0,
			...n
		},
		children: r
	}) : null;
}
function Pt({ variant: e = "dot", letter: t = Y.initial, initials: n = Y.initials, size: r = 28 }) {
	if (e === "plain") return /* @__PURE__ */ J("span", {
		style: {
			fontFamily: "var(--font-display)",
			fontStyle: "italic",
			fontSize: `${r}px`,
			letterSpacing: "-0.02em",
			color: "var(--fg)",
			lineHeight: 1
		},
		children: t
	});
	if (e === "initials") {
		let e = Math.max(4, Math.round(r * .14));
		return /* @__PURE__ */ J("span", {
			style: {
				display: "inline-flex",
				alignItems: "baseline",
				gap: `${Math.round(r * .08)}px`,
				color: "var(--fg)",
				lineHeight: 1
			},
			children: [
				/* @__PURE__ */ J("span", {
					style: {
						fontFamily: "var(--font-display)",
						fontStyle: "italic",
						fontSize: `${r}px`,
						letterSpacing: "-0.04em"
					},
					children: n[0]
				}),
				/* @__PURE__ */ J("span", {
					"aria-hidden": "true",
					style: {
						width: `${e}px`,
						height: `${e}px`,
						borderRadius: "50%",
						background: "var(--accent)",
						transform: `translateY(-${Math.round(r * .04)}px)`
					}
				}),
				/* @__PURE__ */ J("span", {
					style: {
						fontFamily: "var(--font-display)",
						fontStyle: "italic",
						fontSize: `${r}px`,
						letterSpacing: "-0.04em"
					},
					children: n[1]
				})
			]
		});
	}
	if (e === "bracket") return /* @__PURE__ */ J("span", {
		style: {
			display: "inline-flex",
			alignItems: "baseline",
			gap: "2px",
			color: "var(--fg)",
			lineHeight: 1
		},
		children: [
			/* @__PURE__ */ J("span", {
				style: {
					fontFamily: "var(--font-mono)",
					fontSize: `${Math.round(r * .78)}px`,
					color: "var(--fg-subtle)"
				},
				children: "["
			}),
			/* @__PURE__ */ J("span", {
				style: {
					fontFamily: "var(--font-display)",
					fontStyle: "italic",
					fontSize: `${r}px`,
					letterSpacing: "-0.02em"
				},
				children: t
			}),
			/* @__PURE__ */ J("span", {
				style: {
					fontFamily: "var(--font-mono)",
					fontSize: `${Math.round(r * .78)}px`,
					color: "var(--fg-subtle)"
				},
				children: "]"
			})
		]
	});
	if (e === "underline") return /* @__PURE__ */ J("span", {
		style: {
			display: "inline-flex",
			flexDirection: "column",
			alignItems: "flex-start",
			gap: `${Math.max(2, Math.round(r * .08))}px`,
			lineHeight: 1
		},
		children: [/* @__PURE__ */ J("span", {
			style: {
				fontFamily: "var(--font-display)",
				fontStyle: "italic",
				fontSize: `${r}px`,
				letterSpacing: "-0.02em",
				color: "var(--fg)"
			},
			children: t
		}), /* @__PURE__ */ J("span", {
			"aria-hidden": "true",
			style: {
				width: `${Math.round(r * .55)}px`,
				height: "2px",
				background: "var(--accent)"
			}
		})]
	});
	let i = Math.max(5, Math.round(r * .18));
	return /* @__PURE__ */ J("span", {
		style: {
			display: "inline-flex",
			alignItems: "baseline",
			gap: `${Math.max(3, Math.round(r * .12))}px`,
			color: "var(--fg)",
			lineHeight: 1
		},
		children: [/* @__PURE__ */ J("span", {
			style: {
				fontFamily: "var(--font-display)",
				fontStyle: "italic",
				fontSize: `${r}px`,
				letterSpacing: "-0.02em"
			},
			children: t
		}), /* @__PURE__ */ J("span", {
			"aria-hidden": "true",
			style: {
				width: `${i}px`,
				height: `${i}px`,
				borderRadius: "50%",
				background: "var(--accent)",
				transform: `translateY(-${Math.round(r * .06)}px)`
			}
		})]
	});
}
function Ft({ variant: e = "dot", size: t = 22 }) {
	return /* @__PURE__ */ J("span", {
		style: {
			display: "inline-flex",
			alignItems: "baseline",
			gap: "10px"
		},
		children: [/* @__PURE__ */ J(Pt, {
			variant: e,
			size: t
		}), /* @__PURE__ */ J("span", {
			style: {
				fontFamily: "var(--font-body)",
				fontSize: "14px",
				fontWeight: 500,
				letterSpacing: "-0.005em",
				color: "var(--fg)"
			},
			children: Y.name
		})]
	});
}
function Z({ children: e, accent: t = !1, style: n }) {
	return /* @__PURE__ */ J("span", {
		style: {
			fontFamily: "var(--font-mono)",
			fontSize: "11px",
			letterSpacing: "0.08em",
			textTransform: "uppercase",
			color: t ? "var(--accent)" : "var(--fg-subtle)",
			...n
		},
		children: e
	});
}
function It({ children: e, active: t = !1, onClick: n }) {
	return /* @__PURE__ */ J("button", {
		type: "button",
		onClick: n,
		style: {
			fontFamily: "var(--font-mono)",
			fontSize: "11px",
			letterSpacing: "0.04em",
			textTransform: "uppercase",
			padding: "4px 10px",
			borderRadius: "999px",
			border: "1px solid",
			borderColor: t ? "var(--fg)" : "var(--divider-strong)",
			background: t ? "var(--fg)" : "transparent",
			color: t ? "var(--bg)" : "var(--fg-muted)",
			cursor: typeof n == "function" ? "pointer" : "default",
			transition: "all 200ms var(--ease)"
		},
		children: e
	});
}
function Lt({ href: e = "#", onClick: t, external: n = !1, children: r, accentRest: i = !1 }) {
	let [a, o] = V(!1);
	return /* @__PURE__ */ J("a", {
		href: e,
		onClick: (e) => {
			t && (e.preventDefault(), t(e));
		},
		target: n ? "_blank" : void 0,
		rel: n ? "noopener noreferrer" : void 0,
		onMouseEnter: () => o(!0),
		onMouseLeave: () => o(!1),
		style: {
			color: "var(--fg)",
			textDecoration: "underline",
			textDecorationColor: "var(--divider-strong)",
			textUnderlineOffset: "3px",
			textDecorationThickness: "1px",
			backgroundImage: "linear-gradient(var(--accent-soft), var(--accent-soft))",
			backgroundRepeat: "no-repeat",
			backgroundSize: a || i ? "100% 100%" : "0% 100%",
			backgroundPosition: "0 0",
			padding: "1px 3px",
			margin: "-1px -3px",
			transition: "background-size 280ms var(--ease)",
			display: "inline-flex",
			alignItems: "baseline",
			gap: "4px"
		},
		children: [r, n && /* @__PURE__ */ J(X, {
			name: "arrow-up-right",
			size: 13,
			style: { opacity: .6 }
		})]
	});
}
function Rt({ choice: e = "paper", effective: t = "paper", onToggle: n }) {
	let [r, i] = V(!1), a = e === "paper" ? "midnight" : e === "midnight" ? "system" : "paper", o = e === "paper" ? "Switch to dark theme" : e === "midnight" ? "Switch to system theme" : "Switch to light theme";
	return /* @__PURE__ */ J("button", {
		type: "button",
		"aria-label": o,
		title: o,
		"data-theme-choice": e,
		"data-theme-next": a,
		onClick: n,
		onMouseEnter: () => i(!0),
		onMouseLeave: () => i(!1),
		style: {
			display: "inline-flex",
			alignItems: "center",
			justifyContent: "center",
			width: "30px",
			height: "30px",
			padding: 0,
			background: "transparent",
			border: "1px solid",
			borderColor: r ? "var(--divider-strong)" : "var(--divider)",
			borderRadius: "999px",
			color: r ? "var(--fg)" : "var(--fg-muted)",
			cursor: "pointer",
			transition: "color 200ms var(--ease), border-color 200ms var(--ease)"
		},
		children: /* @__PURE__ */ J(X, {
			name: e === "system" ? "monitor" : e === "midnight" ? "moon" : "sun",
			size: 14
		})
	});
}
function zt({ route: e, onNavigate: t, monogram: n = "dot", effectiveTheme: r, themeChoice: i, onToggleTheme: a }) {
	return /* @__PURE__ */ J("nav", {
		style: {
			display: "flex",
			alignItems: "center",
			justifyContent: "space-between",
			padding: "28px 0 24px",
			borderBottom: "1px solid var(--divider)",
			marginBottom: "64px"
		},
		children: [/* @__PURE__ */ J("a", {
			href: "#",
			onClick: (e) => {
				e.preventDefault(), t("home");
			},
			style: {
				textDecoration: "none",
				display: "inline-flex"
			},
			children: /* @__PURE__ */ J(Ft, {
				variant: n,
				size: 22
			})
		}), /* @__PURE__ */ J("div", {
			style: {
				display: "flex",
				gap: "24px",
				alignItems: "center"
			},
			children: [[
				{
					key: "home",
					label: "Home"
				},
				{
					key: "writing",
					label: "Writing"
				},
				{
					key: "contact",
					label: "Contact"
				}
			].map((n) => {
				let r = e === n.key;
				return /* @__PURE__ */ J("a", {
					href: "#",
					onClick: (e) => {
						e.preventDefault(), t(n.key);
					},
					style: {
						fontFamily: "var(--font-body)",
						fontSize: "14.5px",
						color: r ? "var(--fg)" : "var(--fg-muted)",
						textDecoration: "none",
						paddingBottom: "4px",
						borderBottom: r ? "1px solid var(--accent)" : "1px solid transparent",
						transition: "color 200ms var(--ease), border-color 200ms var(--ease)"
					},
					onMouseEnter: (e) => {
						r || (e.currentTarget.style.color = "var(--fg)");
					},
					onMouseLeave: (e) => {
						r || (e.currentTarget.style.color = "var(--fg-muted)");
					},
					children: n.label
				}, n.key);
			}), a && /* @__PURE__ */ J(Rt, {
				choice: i,
				effective: r,
				onToggle: a
			})]
		})]
	});
}
function Bt({ activeSection: e, onJump: t, monogram: n = "dot", effectiveTheme: r, themeChoice: i, onToggleTheme: a }) {
	return /* @__PURE__ */ J("nav", {
		style: {
			position: "sticky",
			top: 0,
			zIndex: 5,
			display: "flex",
			alignItems: "center",
			justifyContent: "space-between",
			padding: "20px 0 18px",
			background: "color-mix(in oklab, var(--bg) 92%, transparent)",
			backdropFilter: "blur(8px)",
			WebkitBackdropFilter: "blur(8px)",
			borderBottom: "1px solid var(--divider)",
			marginBottom: "56px"
		},
		children: [/* @__PURE__ */ J("a", {
			href: "#top",
			onClick: (e) => {
				e.preventDefault(), t("top");
			},
			style: {
				textDecoration: "none",
				display: "inline-flex"
			},
			children: /* @__PURE__ */ J(Ft, {
				variant: n,
				size: 22
			})
		}), /* @__PURE__ */ J("div", {
			style: {
				display: "flex",
				gap: "20px",
				alignItems: "center"
			},
			children: [[
				{
					key: "top",
					label: "Top"
				},
				{
					key: "writing",
					label: "Writing"
				},
				{
					key: "contact",
					label: "Contact"
				}
			].map((n) => {
				let r = e === n.key;
				return /* @__PURE__ */ J("a", {
					href: `#${n.key}`,
					onClick: (e) => {
						e.preventDefault(), t(n.key);
					},
					style: {
						fontFamily: "var(--font-body)",
						fontSize: "14px",
						color: r ? "var(--fg)" : "var(--fg-muted)",
						textDecoration: "none",
						transition: "color 200ms var(--ease)"
					},
					onMouseEnter: (e) => {
						r || (e.currentTarget.style.color = "var(--fg)");
					},
					onMouseLeave: (e) => {
						r || (e.currentTarget.style.color = "var(--fg-muted)");
					},
					children: n.label
				}, n.key);
			}), a && /* @__PURE__ */ J(Rt, {
				choice: i,
				effective: r,
				onToggle: a
			})]
		})]
	});
}
function Q({ theme: e = "paper", route: t, onNavigate: n, monogram: r = "dot", children: i, screenLabel: a, mode: o = "multi", activeSection: s, onJump: c, fontWeight: l = 400, measureCh: u = 62, onToggleTheme: d, themeChoice: f }) {
	return /* @__PURE__ */ J("div", {
		"data-theme": e === "paper" ? void 0 : e,
		"data-screen-label": a,
		className: "ds-root",
		style: {
			minHeight: "100vh",
			background: "var(--bg)",
			color: "var(--fg)",
			fontFamily: "var(--font-body)",
			"--reading-measure": `${u}ch`,
			"--body-weight": l
		},
		children: /* @__PURE__ */ J("div", {
			style: {
				maxWidth: "720px",
				margin: "0 auto",
				padding: "0 clamp(20px, 4vw, 40px) 96px",
				position: "relative"
			},
			children: [
				o === "single" ? /* @__PURE__ */ J(Bt, {
					activeSection: s,
					onJump: c,
					monogram: r,
					effectiveTheme: e,
					themeChoice: f,
					onToggleTheme: d
				}) : /* @__PURE__ */ J(zt, {
					route: t,
					onNavigate: n,
					monogram: r,
					effectiveTheme: e,
					themeChoice: f,
					onToggleTheme: d
				}),
				/* @__PURE__ */ J("main", { children: i }),
				/* @__PURE__ */ J(Vt, { mode: o })
			]
		})
	});
}
function Vt({ mode: e }) {
	return /* @__PURE__ */ J("footer", {
		style: {
			marginTop: "128px",
			paddingTop: "28px",
			borderTop: "1px solid var(--divider)",
			display: "flex",
			justifyContent: "space-between",
			alignItems: "center",
			flexWrap: "wrap",
			gap: "12px"
		},
		children: [/* @__PURE__ */ J(Z, { children: ["© 2026 · ", Y.name] }), /* @__PURE__ */ J("div", {
			style: {
				display: "flex",
				gap: "16px",
				alignItems: "center",
				color: "var(--fg-muted)"
			},
			children: [
				/* @__PURE__ */ J("a", {
					href: `mailto:${Y.email}`,
					style: { color: "inherit" },
					"aria-label": "Email",
					children: /* @__PURE__ */ J(X, {
						name: "mail",
						size: 15
					})
				}),
				/* @__PURE__ */ J("a", {
					href: `https://${Y.github}`,
					target: "_blank",
					rel: "noopener noreferrer",
					style: { color: "inherit" },
					"aria-label": "GitHub",
					children: /* @__PURE__ */ J(X, {
						name: "github",
						size: 15
					})
				}),
				/* @__PURE__ */ J("a", {
					href: `https://${Y.linkedin}`,
					target: "_blank",
					rel: "noopener noreferrer",
					style: { color: "inherit" },
					"aria-label": "LinkedIn",
					children: /* @__PURE__ */ J(X, {
						name: "linkedin",
						size: 15
					})
				}),
				/* @__PURE__ */ J("a", {
					href: `https://twitter.com/${Y.twitter.replace("@", "")}`,
					target: "_blank",
					rel: "noopener noreferrer",
					style: { color: "inherit" },
					"aria-label": "Twitter",
					children: /* @__PURE__ */ J(X, {
						name: "twitter",
						size: 15
					})
				})
			]
		})]
	});
}
function Ht({ date: e, title: t, dek: n, tags: r = [], onOpen: i }) {
	let [a, o] = V(!1);
	return /* @__PURE__ */ J("article", {
		onClick: i,
		onMouseEnter: () => o(!0),
		onMouseLeave: () => o(!1),
		style: {
			display: "grid",
			gridTemplateColumns: "110px 1fr",
			gap: "24px",
			padding: "22px 0",
			borderTop: "1px solid var(--divider)",
			cursor: i ? "pointer" : "default"
		},
		children: [/* @__PURE__ */ J("div", {
			style: {
				fontFamily: "var(--font-mono)",
				fontSize: "12px",
				color: "var(--fg-subtle)",
				letterSpacing: "0.04em",
				paddingTop: "4px"
			},
			children: e
		}), /* @__PURE__ */ J("div", { children: [
			/* @__PURE__ */ J("h3", {
				style: {
					margin: "0 0 6px",
					fontFamily: "var(--font-body)",
					fontWeight: 500,
					fontSize: "19px",
					color: "var(--fg)",
					textDecoration: "underline",
					textDecorationColor: a ? "var(--accent)" : "transparent",
					textUnderlineOffset: "3px",
					transition: "all 200ms var(--ease)"
				},
				children: t
			}),
			/* @__PURE__ */ J("p", {
				style: {
					margin: 0,
					fontSize: "14.5px",
					color: "var(--fg-muted)",
					lineHeight: 1.55,
					maxWidth: "58ch",
					textWrap: "pretty"
				},
				children: n
			}),
			r.length > 0 && /* @__PURE__ */ J("div", {
				style: {
					display: "flex",
					gap: "8px",
					marginTop: "10px",
					flexWrap: "wrap"
				},
				children: r.map((e) => /* @__PURE__ */ J(It, { children: e }, e))
			})
		] })]
	});
}
function Ut({ date: e, title: t, dek: n, tags: r = [], onOpen: i }) {
	let [a, o] = V(!1);
	return /* @__PURE__ */ J("article", {
		onClick: i,
		onMouseEnter: () => o(!0),
		onMouseLeave: () => o(!1),
		style: {
			padding: "20px 22px",
			border: "1px solid var(--divider)",
			borderRadius: "8px",
			background: a ? "var(--bg-elev)" : "transparent",
			boxShadow: a ? "var(--shadow-card)" : "none",
			cursor: i ? "pointer" : "default",
			transition: "background 200ms var(--ease), box-shadow 200ms var(--ease)",
			display: "flex",
			flexDirection: "column",
			gap: "10px"
		},
		children: [
			/* @__PURE__ */ J("div", {
				style: {
					display: "flex",
					alignItems: "center",
					gap: "12px"
				},
				children: [/* @__PURE__ */ J("span", {
					style: {
						fontFamily: "var(--font-mono)",
						fontSize: "11.5px",
						color: "var(--fg-subtle)",
						letterSpacing: "0.05em",
						textTransform: "uppercase"
					},
					children: e
				}), r.length > 0 && /* @__PURE__ */ J(w, { children: [/* @__PURE__ */ J("span", {
					style: { color: "var(--fg-subtle)" },
					children: "·"
				}), /* @__PURE__ */ J("span", {
					style: {
						fontFamily: "var(--font-mono)",
						fontSize: "11.5px",
						color: "var(--fg-subtle)",
						letterSpacing: "0.05em",
						textTransform: "uppercase"
					},
					children: r.join(" · ")
				})] })]
			}),
			/* @__PURE__ */ J("h3", {
				style: {
					margin: 0,
					fontFamily: "var(--font-display)",
					fontWeight: 400,
					fontSize: "24px",
					lineHeight: 1.2,
					letterSpacing: "-0.015em",
					color: "var(--fg)",
					textDecoration: "underline",
					textDecorationColor: a ? "var(--accent)" : "transparent",
					textUnderlineOffset: "4px",
					transition: "text-decoration-color 200ms var(--ease)"
				},
				children: t
			}),
			/* @__PURE__ */ J("p", {
				style: {
					margin: 0,
					fontSize: "14.5px",
					color: "var(--fg-muted)",
					lineHeight: 1.6,
					textWrap: "pretty"
				},
				children: n
			})
		]
	});
}
function Wt({ date: e, title: t, tags: n = [], onOpen: r }) {
	let [i, a] = V(!1);
	return /* @__PURE__ */ J("a", {
		href: "#",
		onClick: (e) => {
			e.preventDefault(), r && r();
		},
		onMouseEnter: () => a(!0),
		onMouseLeave: () => a(!1),
		style: {
			display: "grid",
			gridTemplateColumns: "88px 1fr auto",
			gap: "20px",
			alignItems: "baseline",
			padding: "10px 0",
			borderTop: "1px solid var(--divider)",
			color: "var(--fg)",
			textDecoration: "none"
		},
		children: [
			/* @__PURE__ */ J("span", {
				style: {
					fontFamily: "var(--font-mono)",
					fontSize: "12px",
					color: "var(--fg-subtle)",
					letterSpacing: "0.04em"
				},
				children: e
			}),
			/* @__PURE__ */ J("span", {
				style: {
					fontSize: "15.5px",
					fontWeight: 400,
					color: "var(--fg)",
					backgroundImage: "linear-gradient(var(--accent-soft), var(--accent-soft))",
					backgroundRepeat: "no-repeat",
					backgroundSize: i ? "100% 100%" : "0% 100%",
					backgroundPosition: "0 0",
					padding: "1px 3px",
					margin: "-1px -3px",
					transition: "background-size 280ms var(--ease)"
				},
				children: t
			}),
			/* @__PURE__ */ J("span", {
				style: {
					fontFamily: "var(--font-mono)",
					fontSize: "11px",
					color: "var(--fg-subtle)",
					letterSpacing: "0.05em",
					textTransform: "uppercase"
				},
				children: n[0] || ""
			})
		]
	});
}
function Gt({ when: e, role: t, where: n, note: r }) {
	return /* @__PURE__ */ J("div", {
		style: {
			display: "grid",
			gridTemplateColumns: "110px 1fr",
			gap: "24px",
			padding: "14px 0",
			borderTop: "1px solid var(--divider)"
		},
		children: [/* @__PURE__ */ J("div", {
			style: {
				fontFamily: "var(--font-mono)",
				fontSize: "11.5px",
				color: "var(--fg-subtle)",
				letterSpacing: "0.04em",
				paddingTop: "3px"
			},
			children: e
		}), /* @__PURE__ */ J("div", { children: [/* @__PURE__ */ J("div", {
			style: {
				fontSize: "15.5px",
				color: "var(--fg)"
			},
			children: [/* @__PURE__ */ J("span", {
				style: { fontWeight: 500 },
				children: t
			}), n && /* @__PURE__ */ J("span", {
				style: { color: "var(--fg-muted)" },
				children: [" · ", n]
			})]
		}), r && /* @__PURE__ */ J("div", {
			style: {
				marginTop: "4px",
				fontSize: "14px",
				color: "var(--fg-muted)",
				lineHeight: 1.5,
				maxWidth: "52ch"
			},
			children: r
		})] })]
	});
}
function Kt({ icon: e, label: t, value: n, href: r, copyable: i = !1 }) {
	let [a, o] = V(!1);
	return /* @__PURE__ */ J("div", {
		style: {
			display: "grid",
			gridTemplateColumns: "20px 96px 1fr auto",
			alignItems: "center",
			gap: "16px",
			padding: "14px 0",
			borderTop: "1px solid var(--divider)",
			color: "var(--fg)"
		},
		children: [
			/* @__PURE__ */ J("span", {
				style: { color: "var(--fg-muted)" },
				children: /* @__PURE__ */ J(X, {
					name: e,
					size: 16
				})
			}),
			/* @__PURE__ */ J(Z, { children: t }),
			/* @__PURE__ */ J("span", {
				style: {
					fontFamily: "var(--font-mono)",
					fontSize: "13.5px"
				},
				children: r ? /* @__PURE__ */ J(Lt, {
					href: r,
					external: /^https?:/.test(r),
					children: n
				}) : n
			}),
			i && /* @__PURE__ */ J("button", {
				onClick: (e) => {
					e.preventDefault(), navigator.clipboard && navigator.clipboard.writeText(n).catch(() => {}), o(!0), setTimeout(() => o(!1), 1400);
				},
				"aria-label": `Copy ${t}`,
				style: {
					background: "transparent",
					border: "none",
					cursor: "pointer",
					color: a ? "var(--accent)" : "var(--fg-subtle)",
					fontFamily: "var(--font-mono)",
					fontSize: "11px",
					letterSpacing: "0.06em",
					textTransform: "uppercase",
					display: "inline-flex",
					alignItems: "center",
					gap: "5px",
					padding: "4px 8px",
					borderRadius: "4px",
					transition: "color 200ms var(--ease)"
				},
				children: [/* @__PURE__ */ J(X, {
					name: a ? "check" : "copy",
					size: 13
				}), a ? "copied" : "copy"]
			})
		]
	});
}
//#endregion
//#region docs/Article.jsx
function qt({ slug: e, articles: t, onNavigate: n }) {
	let [r, i] = q.useState(null), [a, o] = q.useState(null), s = q.useRef(null), c = q.useRef(null), l = (t || []).find((t) => t.slug === e);
	q.useEffect(() => {
		let t = !1;
		return i(null), o(null), Promise.all([fetch(`articles/${e}.md`).then((e) => e.ok ? e.text() : Promise.reject(/* @__PURE__ */ Error(`HTTP ${e.status}`))), import("./chunks/markdown-BvJZH8t1.js")]).then(([e, n]) => {
			t || (c.current = n.highlight, i(n.render(e)));
		}).catch((e) => {
			t || o(e.message);
		}), () => {
			t = !0;
		};
	}, [e]), q.useEffect(() => {
		r && s.current && c.current?.(s.current), r && window.scrollTo({
			top: 0,
			behavior: "instant"
		});
	}, [r]);
	let u = q.useMemo(() => {
		if (!l?.date) return "";
		let e = /^(\d{4})-(\d{2})-(\d{2})$/.exec(l.date);
		return e ? `${[
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December"
		][parseInt(e[2], 10) - 1]} ${parseInt(e[3], 10)}, ${e[1]}` : l.date;
	}, [l?.date]);
	return /* @__PURE__ */ J("article", { children: [
		/* @__PURE__ */ J("a", {
			href: "#/writing",
			onClick: (e) => {
				e.preventDefault(), n("writing");
			},
			style: {
				display: "inline-flex",
				alignItems: "center",
				gap: "6px",
				fontFamily: "var(--font-mono)",
				fontSize: "12px",
				letterSpacing: "0.04em",
				textTransform: "uppercase",
				color: "var(--fg-muted)",
				textDecoration: "none",
				marginBottom: "32px"
			},
			children: "← All writing"
		}),
		l ? /* @__PURE__ */ J(w, { children: [
			/* @__PURE__ */ J("div", {
				style: {
					fontFamily: "var(--font-mono)",
					fontSize: "12px",
					color: "var(--fg-subtle)",
					letterSpacing: "0.06em",
					textTransform: "uppercase",
					marginBottom: "12px"
				},
				children: u
			}),
			/* @__PURE__ */ J("h1", {
				style: {
					margin: "0 0 18px",
					fontFamily: "var(--font-display)",
					fontSize: "clamp(2rem, 4vw, 2.75rem)",
					lineHeight: 1.1,
					letterSpacing: "-0.015em",
					fontWeight: 400,
					textWrap: "balance"
				},
				children: l.title
			}),
			l.description && /* @__PURE__ */ J("p", {
				style: {
					margin: "0 0 40px",
					fontSize: "17px",
					color: "var(--fg-muted)",
					lineHeight: 1.55,
					maxWidth: "60ch",
					textWrap: "pretty"
				},
				children: l.description
			})
		] }) : /* @__PURE__ */ J("h1", {
			style: {
				fontFamily: "var(--font-display)",
				fontWeight: 400
			},
			children: e
		}),
		a && /* @__PURE__ */ J("p", {
			style: { color: "var(--fg-muted)" },
			children: [
				"Couldn’t load this essay: ",
				/* @__PURE__ */ J("code", { children: a }),
				"."
			]
		}),
		!a && !r && /* @__PURE__ */ J("p", {
			style: {
				color: "var(--fg-subtle)",
				fontFamily: "var(--font-mono)",
				fontSize: "12px",
				letterSpacing: "0.06em",
				textTransform: "uppercase"
			},
			children: "Loading…"
		}),
		r && /* @__PURE__ */ J("div", {
			ref: s,
			className: "article-body",
			dangerouslySetInnerHTML: { __html: r }
		})
	] });
}
function Jt(e) {
	return /* @__PURE__ */ J(Q, {
		theme: e.theme,
		route: "writing",
		onNavigate: e.onNavigate,
		monogram: e.monogram,
		screenLabel: `Article · ${e.slug}`,
		mode: "multi",
		fontWeight: e.fontWeight,
		measureCh: e.measureCh,
		onToggleTheme: e.onToggleTheme,
		themeChoice: e.themeChoice,
		children: /* @__PURE__ */ J(qt, { ...e })
	});
}
//#endregion
//#region docs/Contact.jsx
function Yt({ mode: e, onSectionRef: t }) {
	return /* @__PURE__ */ J("section", {
		id: "contact",
		ref: e === "single" ? (e) => t?.("contact", e) : null,
		children: [
			/* @__PURE__ */ J(Z, { children: "Contact" }),
			/* @__PURE__ */ J("h1", {
				style: {
					margin: "14px 0 22px",
					fontFamily: "var(--font-display)",
					fontSize: "clamp(2rem, 4vw, 2.75rem)",
					lineHeight: 1.1,
					letterSpacing: "-0.015em",
					fontWeight: 400
				},
				children: "Say hi."
			}),
			/* @__PURE__ */ J("p", {
				style: {
					margin: "0 0 48px",
					fontSize: "16px",
					color: "var(--fg)",
					lineHeight: 1.6,
					maxWidth: "54ch",
					textWrap: "pretty"
				},
				children: [
					"Easiest way to reach me is email — I usually reply within a day or two. Happy to talk about ",
					/* @__PURE__ */ J("em", { children: "Scout" }),
					", agentic AI, data work, or just trade notes."
				]
			}),
			/* @__PURE__ */ J("div", {
				style: {
					padding: "4px 24px",
					background: "var(--bg-elev)",
					border: "1px solid var(--divider)",
					borderRadius: "6px"
				},
				children: [
					/* @__PURE__ */ J(Kt, {
						icon: "mail",
						label: "Email",
						value: Y.email,
						href: `mailto:${Y.email}`,
						copyable: !0
					}),
					/* @__PURE__ */ J(Kt, {
						icon: "github",
						label: "GitHub",
						value: Y.github,
						href: `https://${Y.github}`
					}),
					/* @__PURE__ */ J(Kt, {
						icon: "linkedin",
						label: "LinkedIn",
						value: Y.linkedin,
						href: `https://${Y.linkedin}`
					}),
					/* @__PURE__ */ J(Kt, {
						icon: "twitter",
						label: "Twitter / X",
						value: Y.twitter,
						href: `https://twitter.com/${Y.twitter.replace("@", "")}`
					})
				]
			}),
			/* @__PURE__ */ J("div", {
				style: {
					marginTop: "40px",
					display: "flex",
					gap: "14px",
					alignItems: "flex-start",
					maxWidth: "54ch"
				},
				children: [/* @__PURE__ */ J("span", { style: {
					display: "inline-block",
					width: "8px",
					height: "8px",
					borderRadius: "50%",
					background: "var(--accent)",
					marginTop: "8px",
					flexShrink: 0
				} }), /* @__PURE__ */ J("div", { children: [/* @__PURE__ */ J("div", {
					style: {
						fontSize: "15.5px",
						color: "var(--fg)",
						lineHeight: 1.6,
						textWrap: "pretty"
					},
					children: [
						/* @__PURE__ */ J("strong", {
							style: { fontWeight: 500 },
							children: "At Bloom Growth full-time."
						}),
						" ",
						"Not looking for new roles — but always open to a conversation about agent design, evals, or the data underneath any of it."
					]
				}), /* @__PURE__ */ J("div", {
					style: {
						marginTop: "6px",
						fontFamily: "var(--font-mono)",
						fontSize: "11px",
						letterSpacing: "0.06em",
						textTransform: "uppercase",
						color: "var(--fg-subtle)"
					},
					children: "Last updated · May 2026"
				})] })]
			})
		]
	});
}
function Xt(e) {
	return /* @__PURE__ */ J(Q, {
		theme: e.theme,
		route: e.route,
		onNavigate: e.onNavigate,
		monogram: e.monogram,
		screenLabel: "03 Contact",
		mode: e.mode,
		activeSection: e.activeSection,
		onJump: e.onJump,
		fontWeight: e.fontWeight,
		measureCh: e.measureCh,
		onToggleTheme: e.onToggleTheme,
		themeChoice: e.themeChoice,
		children: /* @__PURE__ */ J(Yt, { ...e })
	});
}
//#endregion
//#region docs/Landing.jsx
function Zt({ intro: e = "compact", mode: t, onNavigate: n, onJump: r, onOpenArticle: i, fontWeight: a = 400, measureCh: o = 62, onSectionRef: s, includeRecentWriting: c = !0, articles: l = [] }) {
	let u = () => t === "single" ? r("writing") : n("writing"), d = () => t === "single" ? r("contact") : n("contact"), f = q.useMemo(() => {
		let e = [
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
		], t = (t) => {
			let n = t && /^(\d{4})-(\d{2})/.exec(t);
			return n ? `${e[parseInt(n[2], 10) - 1]} ${n[1]}` : t || "";
		};
		return (l || []).slice(0, 3).map((e) => ({
			slug: e.slug,
			date: t(e.date),
			title: e.title,
			dek: e.description,
			tags: []
		}));
	}, [l]);
	return /* @__PURE__ */ J(w, { children: [
		/* @__PURE__ */ J("section", {
			id: "top",
			ref: t === "single" ? (e) => s?.("top", e) : null,
			children: e === "pullquote" ? /* @__PURE__ */ J(an, {
				animateKey: e,
				onConnect: d
			}) : J(e === "expansive" ? rn : nn, {
				animateKey: e,
				weight: a,
				measure: o,
				onConnect: d
			})
		}),
		/* @__PURE__ */ J("section", {
			style: { marginTop: "88px" },
			children: [
				/* @__PURE__ */ J(Z, { children: "What I’ve worked on" }),
				/* @__PURE__ */ J("p", {
					style: {
						margin: "14px 0 18px",
						fontSize: "14.5px",
						color: "var(--fg-muted)",
						maxWidth: "56ch",
						lineHeight: 1.55
					},
					children: "Mostly behind the scenes — work for companies, not personal projects. Happy to talk about any of it."
				}),
				/* @__PURE__ */ J("div", { children: [/* @__PURE__ */ J(Gt, {
					when: "2019 — now",
					role: "Data Scientist & AI Engineer",
					where: "Bloom Growth",
					note: "Started in analytics and machine learning — pulling insight out of product data, unifying databanks across platforms. Grew into running the AI project cycle end-to-end and modernizing how we collect, store, and catalogue data. Most of my time now goes to Scout and the agent stack around it."
				}), /* @__PURE__ */ J(Gt, {
					when: "2022",
					role: "Customer Data Scientist",
					where: "Deepnote · 4 mos",
					note: "A short stint helping customers evaluate and adopt Deepnote — practical product demos, plus notebook templates for prospective teams."
				})] })
			]
		}),
		c && /* @__PURE__ */ J("section", {
			id: "writing",
			ref: t === "single" ? (e) => s?.("writing", e) : null,
			style: { marginTop: "88px" },
			children: [/* @__PURE__ */ J("div", {
				style: {
					display: "flex",
					justifyContent: "space-between",
					alignItems: "baseline",
					marginBottom: "8px"
				},
				children: [/* @__PURE__ */ J(Z, { children: "Recent writing" }), /* @__PURE__ */ J("a", {
					href: "#",
					onClick: (e) => {
						e.preventDefault(), u();
					},
					style: {
						fontFamily: "var(--font-body)",
						fontSize: "13.5px",
						color: "var(--fg-muted)",
						textDecoration: "none"
					},
					onMouseEnter: (e) => e.currentTarget.style.color = "var(--accent)",
					onMouseLeave: (e) => e.currentTarget.style.color = "var(--fg-muted)",
					children: t === "single" ? "All essays ↓" : "All writing →"
				})]
			}), /* @__PURE__ */ J("div", { children: [f.map((e) => /* @__PURE__ */ J(Ht, {
				...e,
				onOpen: () => i ? i(e.slug) : u()
			}, e.slug)), /* @__PURE__ */ J("div", { style: { borderTop: "1px solid var(--divider)" } })] })]
		})
	] });
}
function Qt(e) {
	return /* @__PURE__ */ J(Q, {
		theme: e.theme,
		route: e.route,
		onNavigate: e.onNavigate,
		monogram: e.monogram,
		screenLabel: "01 Landing",
		mode: e.mode,
		activeSection: e.activeSection,
		onJump: e.onJump,
		fontWeight: e.fontWeight,
		measureCh: e.measureCh,
		onToggleTheme: e.onToggleTheme,
		themeChoice: e.themeChoice,
		children: /* @__PURE__ */ J(Zt, { ...e })
	});
}
function $t({ onConnect: e, style: t }) {
	let [n, r] = q.useState(!1);
	return /* @__PURE__ */ J("button", {
		type: "button",
		onClick: e,
		onMouseEnter: () => r(!0),
		onMouseLeave: () => r(!1),
		style: {
			display: "inline-flex",
			alignItems: "center",
			gap: "10px",
			fontFamily: "var(--font-body)",
			fontSize: "14.5px",
			fontWeight: 500,
			color: n ? "var(--accent)" : "var(--fg)",
			background: "transparent",
			border: "1px solid",
			borderColor: n ? "var(--accent)" : "var(--divider-strong)",
			borderRadius: "999px",
			padding: "9px 18px 9px 14px",
			cursor: "pointer",
			transition: "color 200ms var(--ease), border-color 200ms var(--ease), transform 200ms var(--ease)",
			transform: n ? "translateX(2px)" : "translateX(0)",
			...t
		},
		children: [
			/* @__PURE__ */ J("span", { style: {
				display: "inline-block",
				width: "7px",
				height: "7px",
				borderRadius: "50%",
				background: "var(--accent)"
			} }),
			"Let’s connect",
			/* @__PURE__ */ J(X, {
				name: "arrow-right",
				size: 14
			})
		]
	});
}
function en({ size: e = "md" }) {
	let t = {
		sm: 168,
		md: 200,
		lg: 220
	};
	return /* @__PURE__ */ J("div", {
		style: {
			width: t[e],
			aspectRatio: "4 / 5",
			overflow: "hidden",
			borderRadius: "var(--r-3)",
			border: "1px solid var(--divider)",
			background: "var(--bg-elev)",
			flexShrink: 0
		},
		children: /* @__PURE__ */ J("img", {
			src: "assets/portrait-320.webp",
			srcSet: "assets/portrait-320.webp 320w, assets/portrait-400.webp 400w, assets/portrait-640.webp 640w",
			sizes: `${t[e]}px`,
			width: t[e],
			height: Math.round(t[e] * 1.25),
			decoding: "async",
			alt: "Francesco Orozco",
			style: {
				width: "100%",
				height: "100%",
				objectFit: "cover",
				display: "block",
				filter: "grayscale(1) contrast(1.02)"
			}
		})
	});
}
function tn({ animateKey: e, portraitSize: t = "md", children: n }) {
	let [r, i] = q.useState(!1);
	return q.useEffect(() => {
		i(!1);
		let e = requestAnimationFrame(() => requestAnimationFrame(() => i(!0)));
		return () => cancelAnimationFrame(e);
	}, [e]), /* @__PURE__ */ J("div", {
		style: {
			display: "grid",
			gridTemplateColumns: "auto 1fr",
			gap: "32px",
			alignItems: "start",
			opacity: +!!r,
			transform: r ? "translateY(0)" : "translateY(8px)",
			transition: "opacity 600ms var(--ease), transform 600ms var(--ease)"
		},
		children: [/* @__PURE__ */ J(en, { size: t }), /* @__PURE__ */ J("div", {
			style: { minWidth: 0 },
			children: n
		})]
	});
}
function nn({ animateKey: e, weight: t, measure: n, onConnect: r }) {
	return /* @__PURE__ */ J(tn, {
		animateKey: e,
		children: [
			/* @__PURE__ */ J(Z, { children: "AI Engineer & Data Scientist · Bloom Growth" }),
			/* @__PURE__ */ J("p", {
				style: {
					margin: "14px 0 14px",
					fontSize: "18px",
					lineHeight: 1.65,
					fontWeight: t,
					color: "var(--fg)",
					maxWidth: `${n}ch`,
					textWrap: "pretty"
				},
				children: [
					"I build ",
					/* @__PURE__ */ J("em", {
						style: {
							fontFamily: "var(--font-display)",
							fontSize: "20px",
							fontStyle: "italic"
						},
						children: "agentic systems"
					}),
					" ",
					"for complex problems. Right now that’s ",
					/* @__PURE__ */ J("em", {
						style: { fontStyle: "italic" },
						children: "Scout"
					}),
					" — an agent at ",
					/* @__PURE__ */ J("strong", {
						style: { fontWeight: 600 },
						children: "Bloom Growth"
					}),
					" people can delegate their work to, 24/7. Before agents, a few years on the data underneath: pipelines, models, and the decisions that run on top."
				]
			}),
			/* @__PURE__ */ J($t, {
				onConnect: r,
				style: { marginTop: "4px" }
			})
		]
	});
}
function rn({ animateKey: e, weight: t, measure: n, onConnect: r }) {
	return /* @__PURE__ */ J(tn, {
		animateKey: e,
		portraitSize: "lg",
		children: [
			/* @__PURE__ */ J(Z, { children: "AI Engineer & Data Scientist · Bloom Growth" }),
			/* @__PURE__ */ J("div", {
				style: {
					maxWidth: `${n}ch`,
					display: "flex",
					flexDirection: "column",
					gap: "14px",
					marginTop: "14px"
				},
				children: [
					/* @__PURE__ */ J("p", {
						style: {
							margin: 0,
							fontSize: "18px",
							lineHeight: 1.65,
							fontWeight: t,
							color: "var(--fg)",
							textWrap: "pretty"
						},
						children: [
							"I’m an AI engineer and data scientist at",
							" ",
							/* @__PURE__ */ J("strong", {
								style: { fontWeight: 600 },
								children: "Bloom Growth"
							}),
							", where I build",
							" ",
							/* @__PURE__ */ J("em", {
								style: {
									fontFamily: "var(--font-display)",
									fontSize: "20px",
									fontStyle: "italic"
								},
								children: "agentic systems"
							}),
							" for complex problems — interactive experiences with AI that don’t just answer, but get things done."
						]
					}),
					/* @__PURE__ */ J("p", {
						style: {
							margin: 0,
							fontSize: "17px",
							lineHeight: 1.65,
							fontWeight: t,
							color: "var(--fg-muted)",
							textWrap: "pretty"
						},
						children: [
							"Right now most of my time goes to ",
							/* @__PURE__ */ J("em", {
								style: { fontStyle: "italic" },
								children: "Scout"
							}),
							" — a coworker people at the company can delegate work to, around the clock. The interesting questions sit between the demo and the deploy: where should the model ask, where should it commit, where should it just stop."
						]
					}),
					/* @__PURE__ */ J("p", {
						style: {
							margin: 0,
							fontSize: "17px",
							lineHeight: 1.65,
							fontWeight: t,
							color: "var(--fg-muted)",
							textWrap: "pretty"
						},
						children: "Before agents, a few years on data: pipelines, models, and the teams that operate them. Most of what I think about agents I learned from watching pipelines fail quietly."
					})
				]
			}),
			/* @__PURE__ */ J($t, {
				onConnect: r,
				style: { marginTop: "18px" }
			})
		]
	});
}
function an({ animateKey: e, onConnect: t }) {
	return /* @__PURE__ */ J(tn, {
		animateKey: e,
		portraitSize: "md",
		children: [
			/* @__PURE__ */ J(Z, { children: "AI Engineer & Data Scientist · Bloom Growth" }),
			/* @__PURE__ */ J("blockquote", {
				style: {
					margin: "14px 0 22px",
					padding: 0,
					borderLeft: "2px solid var(--accent)",
					paddingLeft: "18px"
				},
				children: /* @__PURE__ */ J("p", {
					style: {
						margin: 0,
						fontFamily: "var(--font-display)",
						fontStyle: "italic",
						fontSize: "clamp(1.5rem, 2.6vw, 2rem)",
						lineHeight: 1.2,
						letterSpacing: "-0.015em",
						color: "var(--fg)",
						textWrap: "balance"
					},
					children: "I build agentic systems for complex problems — interactive experiences with AI, on top of the data that makes them honest."
				})
			}),
			/* @__PURE__ */ J("p", {
				style: {
					margin: 0,
					fontSize: "16.5px",
					lineHeight: 1.65,
					color: "var(--fg-muted)",
					textWrap: "pretty"
				},
				children: [
					"Most of my time goes to ",
					/* @__PURE__ */ J("em", {
						style: { fontStyle: "italic" },
						children: "Scout"
					}),
					" — a coworker people at Bloom Growth can delegate work to, around the clock. Before agents, a few years on data: pipelines, models, decisions."
				]
			}),
			/* @__PURE__ */ J($t, {
				onConnect: t,
				style: { marginTop: "20px" }
			})
		]
	});
}
//#endregion
//#region docs/Writing.jsx
var on = [
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
function sn(e) {
	if (!e) return "";
	let t = /^(\d{4})-(\d{2})/.exec(e);
	return t ? `${on[parseInt(t[2], 10) - 1]} ${t[1]}` : e;
}
function cn(e) {
	return {
		slug: e.slug,
		date: sn(e.date),
		title: e.title,
		dek: e.description,
		tags: []
	};
}
function ln({ mode: e, layout: t = "dense", onSectionRef: n, sectionIdPrefix: r = "", articles: i = [], onOpenArticle: a }) {
	let o = r + "writing", s = q.useMemo(() => i.map(cn), [i]);
	return /* @__PURE__ */ J("section", {
		id: o,
		ref: e === "single" ? (e) => n?.("writing", e) : null,
		children: [
			/* @__PURE__ */ J(Z, { children: [
				"Writing · ",
				s.length,
				" essay",
				s.length === 1 ? "" : "s"
			] }),
			/* @__PURE__ */ J("h1", {
				style: {
					margin: "14px 0 24px",
					fontFamily: "var(--font-display)",
					fontSize: "clamp(2rem, 4vw, 2.75rem)",
					lineHeight: 1.1,
					letterSpacing: "-0.015em",
					fontWeight: 400
				},
				children: "Things I’ve been thinking about."
			}),
			/* @__PURE__ */ J("p", {
				style: {
					margin: "0 0 36px",
					fontSize: "16px",
					color: "var(--fg-muted)",
					lineHeight: 1.6,
					maxWidth: "58ch",
					textWrap: "pretty"
				},
				children: "Mostly notes on data, AI, and the engineering around both — written when something has been bothering me long enough that putting it down clears the desk."
			}),
			s.length === 0 ? /* @__PURE__ */ J("p", {
				style: {
					color: "var(--fg-muted)",
					marginTop: "24px"
				},
				children: "Loading essays…"
			}) : t === "cards" ? /* @__PURE__ */ J("div", {
				style: {
					display: "grid",
					gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
					gap: "16px",
					marginTop: "12px"
				},
				children: s.map((e) => /* @__PURE__ */ J(Ut, {
					...e,
					onOpen: () => a?.(e.slug)
				}, e.slug))
			}) : t === "dense" ? /* @__PURE__ */ J("div", {
				style: { marginTop: "12px" },
				children: [s.map((e) => /* @__PURE__ */ J(Wt, {
					...e,
					onOpen: () => a?.(e.slug)
				}, e.slug)), /* @__PURE__ */ J("div", { style: { borderTop: "1px solid var(--divider)" } })]
			}) : /* @__PURE__ */ J("div", {
				style: { marginTop: "12px" },
				children: [s.map((e) => /* @__PURE__ */ J(Ht, {
					...e,
					onOpen: () => a?.(e.slug)
				}, e.slug)), /* @__PURE__ */ J("div", { style: { borderTop: "1px solid var(--divider)" } })]
			})
		]
	});
}
function un(e) {
	return /* @__PURE__ */ J(Q, {
		theme: e.theme,
		route: e.route,
		onNavigate: e.onNavigate,
		monogram: e.monogram,
		screenLabel: "02 Writing",
		mode: e.mode,
		activeSection: e.activeSection,
		onJump: e.onJump,
		fontWeight: e.fontWeight,
		measureCh: e.measureCh,
		onToggleTheme: e.onToggleTheme,
		themeChoice: e.themeChoice,
		children: /* @__PURE__ */ J(ln, { ...e })
	});
}
//#endregion
//#region docs/main.jsx
var $ = {
	monogram: "dot",
	intro: "compact",
	writingLayout: "dense",
	bodyWeight: 400,
	measureCh: 62
}, dn = "fo:theme", fn = (e) => e === "paper" || e === "midnight" || e === "system";
function pn() {
	let [e, t] = q.useState(() => {
		try {
			let e = window.localStorage.getItem(dn);
			return fn(e) ? e : "system";
		} catch {
			return "system";
		}
	});
	return [e, q.useCallback((e) => {
		t(e);
		try {
			window.localStorage.setItem(dn, e);
		} catch {}
	}, [])];
}
function mn(e) {
	let [t, n] = q.useState(() => typeof window.matchMedia == "function" && window.matchMedia("(prefers-color-scheme: dark)").matches ? "midnight" : "paper");
	return q.useEffect(() => {
		if (typeof window.matchMedia != "function") return;
		let e = window.matchMedia("(prefers-color-scheme: dark)"), t = () => n(e.matches ? "midnight" : "paper");
		return e.addEventListener("change", t), () => e.removeEventListener("change", t);
	}, []), e === "system" ? t : e;
}
function hn() {
	let [e, t] = q.useState([]);
	return q.useEffect(() => {
		let e = new AbortController();
		return fetch("articles/index.json", { signal: e.signal }).then((e) => {
			if (!e.ok) throw Error(`index.json ${e.status}`);
			return e.json();
		}).then(t).catch((e) => {
			e.name !== "AbortError" && t([]);
		}), () => e.abort();
	}, []), e;
}
function gn() {
	let e = (window.location.hash || "").replace(/^#\/?/, "").split("?")[0].split("/").filter(Boolean);
	return e.length === 0 || e[0] === "home" ? { route: "home" } : e[0] === "writing" && e[1] ? {
		route: "article",
		slug: e[1]
	} : e[0] === "writing" ? { route: "writing" } : e[0] === "contact" ? { route: "contact" } : { route: "home" };
}
function _n({ effectiveTheme: e, themeChoice: t, onToggleTheme: n, articles: r }) {
	let [i, a] = q.useState(gn);
	q.useEffect(() => {
		let e = () => a(gn());
		return window.addEventListener("hashchange", e), () => window.removeEventListener("hashchange", e);
	}, []);
	let o = q.useCallback((e) => {
		let t = e === "home" ? "#/" : `#/${e}`;
		window.location.hash !== t && (window.location.hash = t), a({ route: e }), window.scrollTo({
			top: 0,
			behavior: "instant"
		});
	}, []), s = q.useCallback((e) => {
		let t = `#/writing/${e}`;
		window.location.hash !== t && (window.location.hash = t), a({
			route: "article",
			slug: e
		}), window.scrollTo({
			top: 0,
			behavior: "instant"
		});
	}, []), c = {
		theme: e,
		monogram: $.monogram,
		mode: "multi",
		fontWeight: $.bodyWeight,
		measureCh: $.measureCh,
		route: i.route === "article" ? "writing" : i.route,
		onNavigate: o,
		onOpenArticle: s,
		onToggleTheme: n,
		themeChoice: t,
		articles: r
	};
	return i.route === "article" ? /* @__PURE__ */ J(Jt, {
		...c,
		slug: i.slug
	}) : i.route === "writing" ? /* @__PURE__ */ J(un, {
		...c,
		layout: $.writingLayout
	}) : i.route === "contact" ? /* @__PURE__ */ J(Xt, { ...c }) : /* @__PURE__ */ J(Qt, {
		...c,
		intro: $.intro
	});
}
function vn() {
	let [e, t] = pn(), n = mn(e), r = hn();
	return /* @__PURE__ */ J(_n, {
		effectiveTheme: n,
		themeChoice: e,
		onToggleTheme: q.useCallback(() => {
			t(e === "paper" ? "midnight" : e === "midnight" ? "system" : "paper");
		}, [e, t]),
		articles: r
	});
}
jt(document.getElementById("root")).render(/* @__PURE__ */ J(vn, {})), requestAnimationFrame(() => requestAnimationFrame(() => {
	document.body.classList.remove("booting");
}));
//#endregion
