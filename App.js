import React, { useState } from "react";
import { SafeAreaView, View, Text, Pressable, StyleSheet } from "react-native";

const START = { rings: 0, hearts: 3, bossHits: 0, finished: false, won: false };

export default function App() {
  const [game, setGame] = useState(START);
  const [jumping, setJumping] = useState(false);

  const collectRing = () => setGame(g => g.finished ? g : ({ ...g, rings: g.rings + 1 }));
  const jump = () => {
    if (game.finished) return;
    setJumping(true);
    setTimeout(() => setJumping(false), 550);
  };
  const hitEnemy = () => setGame(g => {
    if (g.finished) return g;
    const hearts = Math.max(0, g.hearts - 1);
    return { ...g, hearts, finished: hearts === 0, won: false };
  });
  const hitBoss = () => setGame(g => {
    if (g.finished) return g;
    const bossHits = g.bossHits + 1;
    return { ...g, bossHits, finished: bossHits >= 3, won: bossHits >= 3 };
  });
  const restart = () => setGame(START);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.logo}>SPEEDY HEDGEHOG</Text>
        <Text style={styles.stats}>💍 {game.rings}     ❤️ {game.hearts}</Text>
      </View>
      <View style={styles.world}>
        <View style={styles.sky}><Text style={styles.cloud}>☁️       ☁️</Text></View>
        <View style={styles.hill}><Text style={styles.palm}>🌴</Text></View>
        <View style={styles.ground} />
        <View style={[styles.hero, jumping && styles.heroJump]}>
          <Text style={styles.heroText}>🦔</Text>
        </View>
        <View style={styles.ring}><Text style={styles.ringText}>💍</Text></View>
        <View style={styles.enemy}><Text style={styles.enemyText}>🤖</Text></View>
      </View>
      <Text style={styles.instruction}>Collect rings, dodge the robot, then defeat the boss!</Text>
      <View style={styles.controls}>
        <Pressable style={styles.button} onPress={collectRing}><Text style={styles.buttonText}>COLLECT RING</Text></Pressable>
        <Pressable style={styles.button} onPress={jump}><Text style={styles.buttonText}>JUMP</Text></Pressable>
        <Pressable style={styles.buttonDanger} onPress={hitEnemy}><Text style={styles.buttonText}>HIT ENEMY</Text></Pressable>
      </View>
      <View style={styles.bossCard}>
        <Text style={styles.bossTitle}>BOSS BATTLE</Text>
        <Text style={styles.bossInfo}>Boss health: {3 - game.bossHits}/3</Text>
        <Pressable style={styles.bossButton} onPress={hitBoss}><Text style={styles.buttonText}>ATTACK BOSS</Text></Pressable>
      </View>
      {game.finished && (
        <View style={styles.overlay}>
          <Text style={styles.result}>{game.won ? "YOU WIN!" : "GAME OVER"}</Text>
          <Text style={styles.resultSub}>{game.won ? "The boss is defeated!" : "Give it another try!"}</Text>
          <Pressable style={styles.restart} onPress={restart}><Text style={styles.buttonText}>PLAY AGAIN</Text></Pressable>
        </View>
      )}
      <Text style={styles.footer}>Fan-made starter project • Placeholder artwork only</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#071b45", padding: 16, justifyContent: "space-between" },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  logo: { color: "#fff", fontWeight: "900", fontSize: 20 },
  stats: { color: "#fff", fontWeight: "800", fontSize: 18 },
  world: { height: 260, backgroundColor: "#58c9ff", borderRadius: 18, overflow: "hidden", position: "relative" },
  sky: { flex: 1, padding: 16 },
  cloud: { fontSize: 30 },
  hill: { position: "absolute", bottom: 36, right: 15 },
  palm: { fontSize: 54 },
  ground: { position: "absolute", bottom: 0, height: 42, width: "100%", backgroundColor: "#26a64b", borderTopWidth: 5, borderColor: "#a7e34b" },
  hero: { position: "absolute", bottom: 38, left: 34 },
  heroJump: { bottom: 125 },
  heroText: { fontSize: 48 },
  ring: { position: "absolute", bottom: 52, left: "48%" },
  ringText: { fontSize: 30 },
  enemy: { position: "absolute", bottom: 38, right: 40 },
  enemyText: { fontSize: 42 },
  instruction: { color: "#dcecff", textAlign: "center", fontSize: 14 },
  controls: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: 8 },
  button: { backgroundColor: "#087cf0", padding: 13, borderRadius: 12 },
  buttonDanger: { backgroundColor: "#d83c48", padding: 13, borderRadius: 12 },
  buttonText: { color: "#fff", fontWeight: "900" },
  bossCard: { backgroundColor: "#17366c", padding: 14, borderRadius: 14, alignItems: "center", gap: 8 },
  bossTitle: { color: "#ffdb55", fontSize: 18, fontWeight: "900" },
  bossInfo: { color: "#fff", fontWeight: "700" },
  bossButton: { backgroundColor: "#a52a9b", padding: 12, borderRadius: 10 },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.82)", alignItems: "center", justifyContent: "center", gap: 12 },
  result: { color: "#ffdf4d", fontSize: 36, fontWeight: "900" },
  resultSub: { color: "#fff", fontSize: 18 },
  restart: { backgroundColor: "#087cf0", padding: 14, borderRadius: 12 },
  footer: { color: "#a9bddb", fontSize: 11, textAlign: "center" }
});
