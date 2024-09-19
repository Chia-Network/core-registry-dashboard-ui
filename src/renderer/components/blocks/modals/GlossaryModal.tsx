import React, { useMemo, useCallback } from 'react';
import { Modal, GlossaryTable, SearchBox, SkeletonTable } from '@/components';
import { FormattedMessage } from 'react-intl';
import { debounce } from 'lodash';
import { useQueryParamState, useColumnOrderHandler } from '@/hooks';
import { useGetGlossaryQuery } from '@/api';

interface GlossaryModalProps {
  onClose: () => void;
  open: boolean;
}

const GlossaryModal: React.FC<GlossaryModalProps> = ({ onClose, open }) => {
  const { data: glossaryData, isLoading: glossaryLoading, error: glossaryError } = useGetGlossaryQuery();
  const [search, setSearch] = useQueryParamState('search', '');
  const [order, setOrder] = useQueryParamState('order', undefined);
  const handleSetOrder = useColumnOrderHandler(order, setOrder);

  // Memoized ordered data based on gslsthe `order` variable
  const orderedData = useMemo(() => {
    if (!order || !glossaryData) return glossaryData;

    const [orderBy, direction] = order.split(':');
    return [...glossaryData].sort((a, b) => {
      if (a[orderBy] < b[orderBy]) return direction === 'ASC' ? -1 : 1;
      if (a[orderBy] > b[orderBy]) return direction === 'ASC' ? 1 : -1;
      return 0;
    });
  }, [glossaryData, order]);

  // Filter the ordered data based on the search term
  const filteredData = useMemo(() => {
    if (!search.trim()) return orderedData;
    return orderedData?.filter((item) => item.term.toLowerCase().includes(search.toLowerCase()));
  }, [orderedData, search]);

  const handleSearchChange = useCallback(
    debounce((event: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value);
    }, 800),
    [], // Removed dependencies on `setSearch` and `debounce` as they are not expected to change
  );

  // if (glossaryLoading) {
  //   return <SkeletonTable />;
  // }

  // if (glossaryError) {
  //   return <FormattedMessage id={'unable-to-load-contents'} />;
  // }

  return (
    <Modal show={open} onClose={onClose} size={'8xl'} position="top-center">
      <Modal.Header>
        <FormattedMessage id="glossary" />
      </Modal.Header>
      <Modal.Body>
        <div className="flex flex-col md:flex-row gap-6 pl-1 my-2.5 relative z-30">
          <SearchBox defaultValue={search} onChange={handleSearchChange} />
        </div>
        {/* <GlossaryTable data={filteredData || []} isLoading={glossaryLoading} order={order} setOrder={handleSetOrder} /> */}
        {glossaryLoading ? (
          <SkeletonTable />
        ) : glossaryError ? (
          <FormattedMessage id={'unable-to-load-contents'} />
        ) : (
          <GlossaryTable
            data={filteredData || []}
            isLoading={glossaryLoading}
            order={order}
            setOrder={handleSetOrder}
          />
        )}
      </Modal.Body>
    </Modal>
  );
};

export { GlossaryModal };
