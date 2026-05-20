import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

interface LogEntry {
  id: number;
  level: 'log' | 'warn' | 'error';
  msg: string;
}

let _addLog: ((entry: LogEntry) => void) | null = null;
let _counter = 0;

const origLog = console.log.bind(console);
const origWarn = console.warn.bind(console);
const origError = console.error.bind(console);

function intercept(level: LogEntry['level'], args: unknown[]) {
  const msg = args.map(a => {
    try { return typeof a === 'object' ? JSON.stringify(a) : String(a); } catch { return String(a); }
  }).join(' ');
  _addLog?.({ id: _counter++, level, msg });
}

console.log = (...args) => { origLog(...args); intercept('log', args); };
console.warn = (...args) => { origWarn(...args); intercept('warn', args); };
console.error = (...args) => { origError(...args); intercept('error', args); };

export default function DebugOverlay() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [visible, setVisible] = useState(true);
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    _addLog = (entry) => setLogs(prev => [...prev.slice(-80), entry]);
    return () => { _addLog = null; };
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: false });
  }, [logs]);

  return (
    <View style={styles.container} pointerEvents="box-none">
      <TouchableOpacity style={styles.toggle} onPress={() => setVisible(v => !v)}>
        <Text style={styles.toggleText}>{visible ? 'HIDE LOGS' : 'SHOW LOGS'}</Text>
      </TouchableOpacity>
      {visible && (
        <ScrollView ref={scrollRef} style={styles.box} contentContainerStyle={styles.boxContent}>
          {logs.length === 0
            ? <Text style={styles.empty}>no logs yet</Text>
            : logs.map(l => (
                <Text key={l.id} style={[styles.line, styles[l.level]]}>
                  {l.level === 'error' ? '✖ ' : l.level === 'warn' ? '⚠ ' : '› '}{l.msg}
                </Text>
              ))
          }
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
    zIndex: 9999,
  },
  toggle: {
    alignSelf: 'flex-end',
    marginRight: 8,
    marginBottom: 4,
    backgroundColor: '#222',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  toggleText: { color: '#FFC93C', fontSize: 9, fontFamily: 'monospace', letterSpacing: 1 },
  box: {
    maxHeight: 220,
    backgroundColor: 'rgba(0,0,0,0.92)',
    borderTopWidth: 1,
    borderColor: '#333',
  },
  boxContent: { padding: 6, gap: 2 },
  empty: { color: '#555', fontSize: 10, fontFamily: 'monospace' },
  line: { fontSize: 10, fontFamily: 'monospace', flexWrap: 'wrap' },
  log: { color: '#ccc' },
  warn: { color: '#FFC93C' },
  error: { color: '#ff5555' },
});
