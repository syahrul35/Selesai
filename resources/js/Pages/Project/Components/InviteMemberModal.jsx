import { useState } from "react";

export function InviteMemberModal({ show, onClose, users = [], onSubmit }) {
    const [search, setSearch] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);

    if (!show) return null;

    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedUser) return;
        onSubmit(selectedUser);
        setSelectedUser(null);
        setSearch("");
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
                <h2 className="text-lg font-semibold mb-4">
                    Invite Collaborator
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Search */}
                    <div>
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search user by name..."
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>

                    {/* Result List */}
                    <div className="max-h-40 overflow-y-auto border rounded">
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((user) => (
                                <div
                                    key={user.id}
                                    onClick={() => setSelectedUser(user)}
                                    className={`px-3 py-2 cursor-pointer text-sm hover:bg-gray-100 ${
                                        selectedUser?.id === user.id
                                            ? "bg-blue-100"
                                            : ""
                                    }`}
                                >
                                    {user.name}
                                </div>
                            ))
                        ) : (
                            <div className="p-2 text-sm text-gray-500">
                                No users found
                            </div>
                        )}
                    </div>

                    {/* Selected */}
                    {selectedUser && (
                        <div className="text-sm text-gray-600">
                            Selected: <strong>{selectedUser.name}</strong>
                        </div>
                    )}

                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm border rounded"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={!selectedUser}
                            className="px-4 py-2 text-sm bg-blue-600 text-white rounded"
                        >
                            Invite
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
