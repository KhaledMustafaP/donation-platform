import AdminLayout from "../../components/layout/AdminLayout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCampaigns from "../../hooks/useCampaigns";
import { useTranslation } from "react-i18next";

export default function AddCampaign() {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { addCampaign } = useCampaigns();

	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [category, setCategory] = useState("");
	const [goal, setGoal] = useState<number | "">("");
	const [imageUrl, setImageUrl] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		addCampaign({ title, description, category, goal: Number(goal) || 0, raised: 0, imageUrl });
		navigate("/admin/campaigns");
	};

		return (
			<AdminLayout>
				<div className="p-6">
					<h1 className="text-2xl font-bold mb-4">{t('admin.campaigns.add')}</h1>
					<form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
						<div>
							<label className="block text-sm font-medium">{t('form.title')}</label>
							<input value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 w-full border rounded px-3 py-2" />
						</div>

						<div>
							<label className="block text-sm font-medium">{t('form.description')}</label>
							<textarea value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 w-full border rounded px-3 py-2" rows={6} />
						</div>

						<div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
							<div>
								<label className="block text-sm font-medium">{t('form.category')}</label>
								<input value={category} onChange={(e) => setCategory(e.target.value)} className="mt-1 w-full border rounded px-3 py-2" />
							</div>
							<div>
								<label className="block text-sm font-medium">{t('form.goal')}</label>
								<input type="number" value={goal} onChange={(e) => setGoal(e.target.value === "" ? "" : Number(e.target.value))} className="mt-1 w-full border rounded px-3 py-2" />
							</div>
							<div>
								<label className="block text-sm font-medium">{t('form.image_url')}</label>
								<input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="mt-1 w-full border rounded px-3 py-2" />
							</div>
						</div>

						<div>
							<button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">{t('admin.campaigns.create')}</button>
						</div>
					</form>
				</div>
			</AdminLayout>
		);
}
