import { Link } from "react-router-dom";
import AdminLayout from "../../components/layout/AdminLayout";
import useCampaigns from "../../hooks/useCampaigns";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import formatCurrency from "../../utils/formatCurrency";

export default function CampaignList() {
	const { t } = useTranslation();
	const { campaigns, removeCampaign } = useCampaigns();

	const total = useMemo(() => campaigns.length, [campaigns]);

	return (
		<AdminLayout>
			<div className="p-6">
				<div className="flex items-center justify-between mb-6">
					<h1 className="text-2xl font-bold">{t('admin.campaigns.title')} ({total})</h1>
					<Link to="/admin/campaigns/add" className="bg-green-600 text-white px-4 py-2 rounded-md">{t('admin.campaigns.add')}</Link>
				</div>

				{campaigns.length === 0 ? (
					<p className="text-gray-600">{t('admin.campaigns.empty')}</p>
				) : (
					<div className="overflow-x-auto rounded-md border">
						<table className="w-full text-sm">
							<thead className="bg-gray-100">
								<tr>
									<th className="p-3 text-left">{t('admin.campaigns.table.title')}</th>
									<th className="p-3 text-left">{t('admin.campaigns.table.category')}</th>
									<th className="p-3 text-left">{t('admin.campaigns.table.goal')}</th>
									<th className="p-3 text-left">{t('admin.campaigns.table.raised')}</th>
									<th className="p-3 text-left">{t('admin.campaigns.table.actions')}</th>
								</tr>
							</thead>
							<tbody>
								{campaigns.map((c) => (
									<tr key={c.id} className="border-t hover:bg-gray-50">
										<td className="p-3">{c.title}</td>
										<td className="p-3">{c.category || t('dashboard.not_provided')}</td>
										<td className="p-3">{formatCurrency(Number(c.goal ?? 0))}</td>
										<td className="p-3">{formatCurrency(Number(c.raised ?? 0))}</td>
										<td className="p-3">
											<Link to={`/admin/campaigns/${c.id}/edit`} className="mr-3 text-blue-600">{t('common.edit')}</Link>
											<button onClick={() => removeCampaign(c.id)} className="text-red-600">{t('common.delete')}</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</div>
		</AdminLayout>
	);
}
