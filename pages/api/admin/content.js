import { getContent, saveContent } from '../../../lib/db';
import { withRole } from '../../../lib/middleware';

async function handler(req, res) {
  const { contentType } = req.query; // meetings, officers, directory, privateEvents

  const validTypes = ['meetings', 'officers', 'directory', 'privateEvents'];
  if (!validTypes.includes(contentType)) {
    return res.status(400).json({ error: 'Invalid content type' });
  }

  if (req.method === 'GET') {
    // Get content for a specific type
    const content = getContent();
    return res.status(200).json(content[contentType] || []);
  }

  if (req.method === 'POST') {
    // Add new item
    const content = getContent();
    const item = {
      id: Date.now().toString(),
      ...req.body,
      updatedAt: new Date().toISOString()
    };

    if (!content[contentType]) {
      content[contentType] = [];
    }

    content[contentType].push(item);
    saveContent(content);

    return res.status(201).json({ success: true, item });
  }

  if (req.method === 'PUT') {
    // Update item
    const { itemId } = req.query;
    const content = getContent();

    const items = content[contentType] || [];
    const itemIndex = items.findIndex(i => i.id === itemId);

    if (itemIndex === -1) {
      return res.status(404).json({ error: 'Item not found' });
    }

    items[itemIndex] = {
      ...items[itemIndex],
      ...req.body,
      updatedAt: new Date().toISOString()
    };

    content[contentType] = items;
    saveContent(content);

    return res.status(200).json({ success: true, item: items[itemIndex] });
  }

  if (req.method === 'DELETE') {
    // Delete item
    const { itemId } = req.query;
    const content = getContent();

    const items = content[contentType] || [];
    content[contentType] = items.filter(i => i.id !== itemId);

    saveContent(content);

    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

export default withRole(handler, 'officer');
