// Contact.jsx — small focused card with Francesco's channels.

function ContactContent({ mode, onSectionRef }) {
  return (
    <section id="contact" ref={mode === 'single' ? (el) => onSectionRef?.('contact', el) : null}>
        <MetaLabel>Contact</MetaLabel>
        <h1 style={{
          margin: '14px 0 22px',
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2rem, 4vw, 2.75rem)',
          lineHeight: 1.1,
          letterSpacing: '-0.015em',
          fontWeight: 400,
        }}>
          Say hi.
        </h1>
        <p style={{ margin: '0 0 48px', fontSize: '16px', color: 'var(--fg)',
                    lineHeight: 1.6, maxWidth: '54ch', textWrap: 'pretty' }}>
          Easiest way to reach me is email — I usually reply within a day or two.
          Happy to talk about <em>Scout</em>, agentic AI, data work, or just trade notes.
        </p>

        {/* Channels */}
        <div style={{
          padding: '4px 24px',
          background: 'var(--bg-elev)',
          border: '1px solid var(--divider)',
          borderRadius: '6px',
        }}>
          <ContactRow icon="mail" label="Email"
                      value={ME.email}
                      href={`mailto:${ME.email}`}
                      copyable/>
          <ContactRow icon="github" label="GitHub"
                      value={ME.github}
                      href={`https://${ME.github}`}/>
          <ContactRow icon="linkedin" label="LinkedIn"
                      value={ME.linkedin}
                      href={`https://${ME.linkedin}`}/>
          <ContactRow icon="twitter" label="Twitter / X"
                      value={ME.twitter}
                      href={`https://twitter.com/${ME.twitter.replace('@','')}`}/>
        </div>

        {/* Availability note */}
        <div style={{ marginTop: '40px', display: 'flex', gap: '14px',
                      alignItems: 'flex-start', maxWidth: '54ch' }}>
          <span style={{ display: 'inline-block', width: '8px', height: '8px',
                         borderRadius: '50%', background: 'var(--accent)',
                         marginTop: '8px', flexShrink: 0 }}/>
          <div>
            <div style={{ fontSize: '15.5px', color: 'var(--fg)', lineHeight: 1.6,
                          textWrap: 'pretty' }}>
              <strong style={{ fontWeight: 500 }}>At Bloom Growth full-time.</strong>{' '}
              Not looking for new roles — but always open to a conversation about
              agent design, evals, or the data underneath any of it.
            </div>
            <div style={{ marginTop: '6px', fontFamily: 'var(--font-mono)',
                          fontSize: '11px', letterSpacing: '0.06em',
                          textTransform: 'uppercase', color: 'var(--fg-subtle)' }}>
              Last updated · May 2026
            </div>
          </div>
        </div>
      </section>
  );
}

function Contact(props) {
  return (
    <Page theme={props.theme} route={props.route} onNavigate={props.onNavigate}
          monogram={props.monogram} screenLabel="03 Contact" mode={props.mode}
          activeSection={props.activeSection} onJump={props.onJump}
          fontWeight={props.fontWeight} measureCh={props.measureCh}
          onToggleTheme={props.onToggleTheme} themeChoice={props.themeChoice}>
      <ContactContent {...props}/>
    </Page>
  );
}

window.Contact = Contact;
window.ContactContent = ContactContent;
