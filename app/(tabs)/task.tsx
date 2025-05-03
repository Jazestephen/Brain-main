import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  Pressable,
  TextInput,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

type Assignment = {
  id: string;
  title: string;
};

const AssignmentsScreen = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [counter, setCounter] = useState(1);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [shareModalVisible, setShareModalVisible] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');

  const people = [
    {
      id: '1',
      name: 'Rhovic Delas Armas',
      avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      id: '2',
      name: 'Stephen De Vera',
      avatarUrl: 'https://randomuser.me/api/portraits/women/45.jpg',
    },
    {
      id: '3',
      name: 'Marcelo Miguel',
      avatarUrl: 'https://randomuser.me/api/portraits/women/68.jpg',
    },
    {
      id: '4',
      name: 'Add People',
      avatarUrl: 'https://img.icons8.com/ios-filled/50/add-user-group-man-man.png',
    },
  ];

  const handleCreate = () => {
    const newAssignment: Assignment = {
      id: counter.toString(),
      title: `New Assignment ${counter}`,
    };
    setAssignments([...assignments, newAssignment]);
    setCounter(counter + 1);
  };

  const handleDelete = () => {
    if (selectedAssignment) {
      setAssignments(assignments.filter((item) => item.id !== selectedAssignment.id));
      setSelectedAssignment(null);
      setModalVisible(false);
    }
  };

  const handleEdit = () => {
    if (selectedAssignment) {
      setEditedTitle(selectedAssignment.title);
      setModalVisible(false);
      setEditModalVisible(true);
    }
  };

  const saveEditedTitle = () => {
    if (selectedAssignment) {
      const updatedAssignments = assignments.map((item) =>
        item.id === selectedAssignment.id ? { ...item, title: editedTitle } : item
      );
      setAssignments(updatedAssignments);
      setEditModalVisible(false);
      setSelectedAssignment(null);
    }
  };

  const renderItem = ({ item }: { item: Assignment }) => (
    <View style={styles.card}>
      <Icon name="notifications-outline" size={20} color="white" style={styles.iconLeft} />
      <Text style={styles.title}>{item.title}</Text>
      <TouchableOpacity
        style={styles.iconRight}
        onPress={() => {
          setSelectedAssignment(item);
          setModalVisible(true);
        }}
      >
        <Icon name="ellipsis-vertical" size={20} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconShare}
        onPress={() => {
          setSelectedAssignment(item);
          setShareModalVisible(true);
        }}
      >
        <Icon name="share-social-outline" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.createButton} onPress={handleCreate}>
          <Icon name="add" size={20} color="blue" />
          <Text style={styles.createText}>Create</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={assignments}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={
          <Text style={{ color: 'white', textAlign: 'center', marginTop: 40 }}>
            No assignments yet. Tap "Create" to add one.
          </Text>
        }
      />

      {/* Modal with Options */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable style={styles.modalBackground} onPress={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.modalOption} onPress={handleEdit}>
              <Text style={styles.modalText}>Edit Title</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalOption} onPress={handleDelete}>
              <Text style={[styles.modalText, { color: 'red' }]}>Delete</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>

      {/* Edit Modal */}
      <Modal
        transparent={true}
        visible={editModalVisible}
        animationType="fade"
        onRequestClose={() => setEditModalVisible(false)}
      >
        <Pressable style={styles.modalBackground} onPress={() => setEditModalVisible(false)}>
          <View style={styles.modalContainer}>
            <TextInput
              style={styles.input}
              value={editedTitle}
              onChangeText={setEditedTitle}
              placeholder="Edit assignment title"
              placeholderTextColor="#aaa"
            />
            <TouchableOpacity style={styles.modalOption} onPress={saveEditedTitle}>
              <Text style={styles.modalText}>Save</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>

      {/* Share Modal */}
      <Modal
        transparent={true}
        visible={shareModalVisible}
        animationType="fade"
        onRequestClose={() => setShareModalVisible(false)}
      >
        <Pressable style={styles.modalBackground} onPress={() => setShareModalVisible(false)}>
          <View style={styles.shareCard}>
            <Text style={styles.shareTitle}>Share Assignment</Text>

            {people.map((person) => (
              <View key={person.id} style={styles.personRow}>
                <Image source={{ uri: person.avatarUrl }} style={styles.avatar} />
                <Text style={styles.personName}>{person.name}</Text>
              </View>
            ))}

            <TouchableOpacity style={styles.copyButton}>
              <Icon name="copy-outline" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d0d',
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1f1f1f',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginTop: 30,
  },
  createText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 6,
    marginBottom: 2,
  },
  card: {
    backgroundColor: '#6A5ACD',
    borderRadius: 10,
    borderColor: '#FFFFFF',
    borderWidth: 1.5,
    padding: 30,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  title: {
    color: 'white',
    fontSize: 14,
    flex: 1,
    marginLeft: 8,
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    position: 'absolute',
    right: 12,
    top: 12,
  },
  iconShare: {
    position: 'absolute',
    right: 12,
    bottom: 12,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#1f1f1f',
    padding: 20,
    borderRadius: 10,
    width: 250,
  },
  modalOption: {
    paddingVertical: 10,
  },
  modalText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#333',
    color: 'white',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 10,
  },
  shareCard: {
    backgroundColor: '#1f1f1f',
    padding: 20,
    borderRadius: 10,
    width: 280,
    minHeight: 200,
    position: 'relative',
  },
  shareTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    alignSelf: 'center',
  },
  personRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    alignSelf: 'flex-start',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
    backgroundColor: '#ccc',
  },
  personName: {
    color: 'white',
    fontSize: 16,
  },
  copyButton: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    backgroundColor: '#444',
    padding: 10,
    borderRadius: 30,
  },
});

export default AssignmentsScreen;
