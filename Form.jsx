import React, { useState, useEffect } from 'react';

const Form = ({ onSubmit, initialData = {}, onClose }) => {
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    attribuerA: '',
    priorite: 'Basse',
  });

  useEffect(() => {
    setFormData(initialData.idIncident ? initialData : {
      titre: '',
      description: '',
      attribuerA: '',
      priorite: 'Basse',
    });
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-2 w-full  mx-auto">
      <h3 className="text-lg text-body dark:text-gray-200 font-bold mb-4">{initialData.idIncident ? 'Modifier un incident' : 'Ajouter un incident'}</h3>
      <div className="mb-4">
        <label className="block text-sub dark:text-gray-300 text-sm font-bold mb-2">Titre</label>
        <input 
          type="text" 
          name="titre" 
          value={formData.titre || ''} 
          onChange={handleChange} 
          placeholder="Entrez le titre de l'incident"
          className="shadow appearance-none border border-gray-300 dark:border-gray-600 rounded w-full py-2 px-3 text-body dark:text-gray-200 dark:bg-gray-700 focus:outline-none focus:border-blue-500"  
        />
      </div>
      <div className="mb-4">
        <label className="block text-sub dark:text-gray-300 text-sm font-bold mb-2">Description</label>
        <textarea 
          name="description" 
          value={formData.description || ''} 
          onChange={handleChange} 
          placeholder="Entrez la description de l'incident"
          rows="4"
          className="shadow appearance-none border border-gray-300 dark:border-gray-600 rounded w-full py-2 px-3 text-body dark:text-gray-200 dark:bg-gray-700 focus:outline-none focus:border-blue-500"
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block text-sub dark:text-gray-300 text-sm font-bold mb-2">Attribué à</label>
        <input 
          type="text" 
          name="attribuerA" 
          value={formData.attribuerA || ''} 
          onChange={handleChange} 
          placeholder="Nom de la personne"
          className="shadow appearance-none border border-gray-300 dark:border-gray-600 rounded w-full py-2 px-3 text-body dark:text-gray-200 dark:bg-gray-700 focus:outline-none focus:border-blue-500" 
        />
      </div>
      <div className="mb-4">
        <label className="block text-sub dark:text-gray-300 text-sm font-bold mb-2">Priorité</label>
        <select 
          name="priorite" 
          value={formData.priorite || 'Basse'} 
          onChange={handleChange} 
          className="shadow appearance-none border border-gray-300 dark:border-gray-600 rounded w-full py-2 px-3 text-body dark:text-gray-200 dark:bg-gray-700 focus:outline-none focus:border-blue-500"
        >
          <option>Basse</option>
          <option>Moyenne</option>
          <option>Haute</option>
          <option>Critique</option>
        </select>
      </div>
      <div className="flex justify-between space-x-2">
        <button
          type="button"
          onClick={onClose}
          className="bg-muted hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-body dark:text-gray-100 font-bold py-2 px-4 rounded-md text-sm"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md text-sm"
        >
          {initialData.idIncident ? 'Enregistrer les modifications' : 'Ajouter'}
        </button>
      </div>
    </form>
  );
};

export default Form;