import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

const Accordion = ({ title, content, iconImage }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleAccordion = () => {
    setExpanded(!expanded);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleAccordion} style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        <Image
          source={iconImage}
          style={[styles.icon, expanded && styles.expandedIcon]}
        />
      </TouchableOpacity>
      {expanded && <View style={styles.contentContainer}>{content}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: "#000",
    borderRadius: 4,
    marginBottom: 10,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: "#f2f2f2",
  },
  title: {
    flex: 1,
    fontSize: 14,
    fontWeight: "bold",
    color: "#344055",
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  expandedIcon: {
    transform: [{ rotate: "180deg" }],
  },
  contentContainer: {
    padding: 16,
  },
});
export default Accordion;
