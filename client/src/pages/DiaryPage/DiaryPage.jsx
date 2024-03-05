import { useEffect, useState } from 'react';
import authService from '../../services/auth.service';
import { API_ENDPOINTS } from '../../config';
import EntryCard from '../../components/EntryCard/EntryCard';
import Container from 'react-bootstrap/esm/Container';
import entryService from '../../services/entry.service';

function DiaryPage() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [editingEntryId, setEditingEntryId] = useState(null);

  const getAllEntries = () => {
    console.log(`getAllEntries called!!!`);

    authService.api
      .get(API_ENDPOINTS.entries)
      .then(res => {
        console.log('res.data', res.data);
        setEntries(res.data);
      })
      .catch(error => {
        setError('Failed to load entries');
        console.log(error);
      });
  };

  useEffect(() => {
    getAllEntries();
  }, []);

  const handleDelete = async entryId => {
    try {
      await entryService.deleteOne(entryId);

      setSuccessMessage('Entry deleted correctly.');
      getAllEntries();
    } catch (error) {
      console.error(`Error deleting entry: `, error);
      setError(`Error deleting entry.`);
    }
  };

  const toggleEditingEntryId = entryId => {
    if (editingEntryId === entryId) {
      setEditingEntryId(null);
    }

    setEditingEntryId(entryId);
  };

  const handleEditCancel = entry => {
    // TO DO when we click on "cancel":
    // 1. We should toggle the value of EditingEntryId.
    toggleEditingEntryId(entry._id);
    // 2. We should display just EntryCard, making sure we are showing the prompts as they were before any edits.
    return (
      <EntryCard
        key={entry._id}
        entry={entry}
        onDelete={handleDelete}
        toggleEditingEntryId={toggleEditingEntryId}
        handleEditSubmit={handleEditSubmit}
        handleEditCancel={handleEditCancel}
      ></EntryCard>
    );
  };

  const handleEditSubmit = async (entryId, updatedEntryData) => {
    try {
      const response = await entryService.updateOne(entryId, updatedEntryData);
      console.log(`Entry updated: `, response.data);
      toggleEditingEntryId();
      setSuccessMessage('Edits saved successfully!');
    } catch (error) {
      console.error(`Error updating entry: `, error);
      setError(`Error updating entry.`);
    }
  };

  const EntryCardItems = entries.map(entry => {
    return (
      <EntryCard
        key={entry._id}
        entry={entry}
        onDelete={handleDelete}
        toggleEditingEntryId={toggleEditingEntryId}
        handleEditSubmit={handleEditSubmit}
        handleEditCancel={handleEditCancel}
        editingEntryId={editingEntryId}
      ></EntryCard>
    );
  });

  return (
    <>
      {error && (
        <div>
          <span className="errorMessage">{error}</span>
        </div>
      )}
      {successMessage && (
        <div>
          <span>{successMessage}</span>
        </div>
      )}
      {entries.length > 0 ? (
        <Container className="d-flex flex-wrap ">{EntryCardItems}</Container>
      ) : null}
    </>
  );
}

export default DiaryPage;
